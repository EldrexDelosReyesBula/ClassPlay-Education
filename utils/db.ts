
import { ClassGroup } from "../types";

const DB_NAME = "ClassPlayDB";
const STORE_NAME = "classes";
const QUESTIONS_STORE = "questions";
const TOOLS_STORE = "tool_states";
const DB_VERSION = 3;

export const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(QUESTIONS_STORE)) {
        db.createObjectStore(QUESTIONS_STORE, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(TOOLS_STORE)) {
        db.createObjectStore(TOOLS_STORE, { keyPath: "id" });
      }
    };
  });
};

export const saveClass = async (classGroup: ClassGroup): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(classGroup);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const getClasses = async (): Promise<ClassGroup[]> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const deleteClass = async (id: string): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

// Questions Handling
export const saveQuestions = async (id: string, questions: string[]): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([QUESTIONS_STORE], "readwrite");
    const store = transaction.objectStore(QUESTIONS_STORE);
    const request = store.put({ id, items: questions });
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const getQuestions = async (id: string): Promise<string[]> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([QUESTIONS_STORE], "readonly");
    const store = transaction.objectStore(QUESTIONS_STORE);
    const request = store.get(id);

    request.onsuccess = () => resolve(request.result ? request.result.items : []);
    request.onerror = () => reject(request.error);
  });
};

// Tool State Handling
export const saveToolState = async (toolId: string, data: any): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([TOOLS_STORE], "readwrite");
    const store = transaction.objectStore(TOOLS_STORE);
    const request = store.put({ id: toolId, data });
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const getToolState = async (toolId: string): Promise<any> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([TOOLS_STORE], "readonly");
    const store = transaction.objectStore(TOOLS_STORE);
    const request = store.get(toolId);
    request.onsuccess = () => resolve(request.result ? request.result.data : null);
    request.onerror = () => reject(request.error);
  });
};

// Global Backup
export const exportBackup = async (): Promise<string> => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const exportData: any = {};
        const transaction = db.transaction([STORE_NAME, QUESTIONS_STORE, TOOLS_STORE], "readonly");
        
        transaction.objectStore(STORE_NAME).getAll().onsuccess = (e: any) => {
            exportData.classes = e.target.result;
        };
        transaction.objectStore(QUESTIONS_STORE).getAll().onsuccess = (e: any) => {
            exportData.questions = e.target.result;
        };
        transaction.objectStore(TOOLS_STORE).getAll().onsuccess = (e: any) => {
            exportData.tools = e.target.result;
        };

        transaction.oncomplete = () => {
            resolve(JSON.stringify(exportData));
        };
        transaction.onerror = () => reject("Export failed");
    });
};

export const importBackup = async (jsonString: string): Promise<void> => {
    const data = JSON.parse(jsonString);
    const db = await openDB();
    
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME, QUESTIONS_STORE, TOOLS_STORE], "readwrite");
        
        // Clear existing data? Or merge? Strategy: Clear and Replace to avoid conflicts
        const classStore = transaction.objectStore(STORE_NAME);
        classStore.clear();
        if (Array.isArray(data.classes)) {
            data.classes.forEach((c: any) => classStore.put(c));
        }

        const qStore = transaction.objectStore(QUESTIONS_STORE);
        qStore.clear();
        if (Array.isArray(data.questions)) {
            data.questions.forEach((q: any) => qStore.put(q));
        }

        const tStore = transaction.objectStore(TOOLS_STORE);
        tStore.clear();
        if (Array.isArray(data.tools)) {
            data.tools.forEach((t: any) => tStore.put(t));
        }

        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject("Import failed");
    });
};
