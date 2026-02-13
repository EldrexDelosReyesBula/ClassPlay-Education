import { ClassGroup } from "../types";

const DB_NAME = "ClassPlayDB";
const STORE_NAME = "classes";
const QUESTIONS_STORE = "questions";
const DB_VERSION = 2;

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
