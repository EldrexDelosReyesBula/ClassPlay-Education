import React, { useState, useEffect, useRef } from 'react';
import readXlsxFile from 'read-excel-file';
import { v4 as uuidv4 } from 'uuid';
import { ClassGroup, Student } from '../types';
import { saveClass, getClasses, deleteClass } from '../utils/db';

interface ClassManagerProps {
  onClose: () => void;
}

export const ClassManager: React.FC<ClassManagerProps> = ({ onClose }) => {
  const [classes, setClasses] = useState<ClassGroup[]>([]);
  const [view, setView] = useState<'list' | 'create'>('list');
  const [loading, setLoading] = useState(false);
  
  // Create Form State
  const [className, setClassName] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [bulkText, setBulkText] = useState('');
  const [manualFirstName, setManualFirstName] = useState('');
  const [manualLastName, setManualLastName] = useState('');
  const [manualSkill, setManualSkill] = useState<'low' | 'medium' | 'high'>('medium');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    setLoading(true);
    try {
      const data = await getClasses();
      setClasses(data.sort((a, b) => b.createdAt - a.createdAt));
    } catch (e) {
      console.error("Failed to load classes", e);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const rows = await readXlsxFile(file);
      const newStudents: Student[] = [];
      
      let startIndex = 0;
      if (rows.length > 0 && String(rows[0][0]).toLowerCase().includes('name')) {
        startIndex = 1;
      }

      for (let i = startIndex; i < rows.length; i++) {
        const row = rows[i];
        if (row[0]) {
          newStudents.push({
            id: uuidv4(),
            firstName: String(row[0]),
            lastName: row[1] ? String(row[1]) : '',
            group: row[2] ? String(row[2]) : undefined,
            skillLevel: 'medium'
          });
        }
      }
      setStudents(prev => [...prev, ...newStudents]);
    } catch (error) {
      alert("Error reading file. Please ensure it is a valid Excel file.");
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleBulkAdd = () => {
    if (!bulkText.trim()) return;
    
    const lines = bulkText.split(/\r?\n/);
    const newStudents: Student[] = lines
      .filter(line => line.trim() !== '')
      .map(line => {
        // Simple heuristic: First space splits first/last name
        const parts = line.trim().split(' ');
        const firstName = parts[0];
        const lastName = parts.slice(1).join(' ');
        
        return {
          id: uuidv4(),
          firstName,
          lastName,
          skillLevel: 'medium'
        };
      });

    setStudents(prev => [...prev, ...newStudents]);
    setBulkText('');
  };

  const addManualStudent = () => {
    if (!manualFirstName.trim()) return;
    setStudents(prev => [
      {
        id: uuidv4(),
        firstName: manualFirstName.trim(),
        lastName: manualLastName.trim(),
        skillLevel: manualSkill
      },
      ...prev
    ]);
    setManualFirstName('');
    setManualLastName('');
    setManualSkill('medium');
  };

  const updateStudentSkill = (id: string, skill: 'low' | 'medium' | 'high') => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, skillLevel: skill } : s));
  };

  const handleRemoveStudent = (id: string) => {
    if (window.confirm("Are you sure you want to remove this student?")) {
      setStudents(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleSaveClass = async () => {
    if (!className.trim()) {
      alert("Please enter a class name");
      return;
    }
    if (students.length === 0) {
      alert("Please add at least one student");
      return;
    }

    const newClass: ClassGroup = {
      id: uuidv4(),
      name: className.trim(),
      students: students,
      createdAt: Date.now()
    };

    await saveClass(newClass);
    await loadClasses();
    setView('list');
    resetForm();
  };

  const handleDeleteClass = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this class? This action cannot be undone.')) {
      await deleteClass(id);
      loadClasses();
    }
  };

  const resetForm = () => {
    setClassName('');
    setStudents([]);
    setBulkText('');
    setManualFirstName('');
    setManualLastName('');
    setManualSkill('medium');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-50 dark:bg-[#0b1419] flex flex-col animate-[fadeIn_0.2s_ease-out]">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6 border-b border-slate-200 dark:border-[#233c48] bg-white dark:bg-[#111c22]">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-[#233c48] rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-slate-600 dark:text-white">arrow_back</span>
          </button>
          <h1 className="text-2xl font-bold dark:text-white">Class Lists</h1>
        </div>
        {view === 'list' && (
          <button 
            onClick={() => setView('create')}
            className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20"
          >
            <span className="material-symbols-outlined">add</span>
            Create New Class
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 max-w-5xl mx-auto w-full">
        {view === 'list' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <p className="text-slate-500">Loading classes...</p>
            ) : classes.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-slate-100 dark:bg-[#233c48] rounded-full flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-4xl text-slate-400">group_off</span>
                </div>
                <h3 className="text-lg font-bold dark:text-white mb-2">No classes found</h3>
                <p className="text-slate-500 dark:text-[#92b7c9] mb-6 max-w-xs">Create a class list to use with Random Picker, Team Maker, and other tools.</p>
                <button 
                  onClick={() => setView('create')}
                  className="text-primary font-bold hover:underline"
                >
                  Create your first class
                </button>
              </div>
            ) : (
              classes.map(cls => (
                <div key={cls.id} className="bg-white dark:bg-[#111c22] border border-slate-200 dark:border-[#233c48] rounded-xl p-6 hover:shadow-lg transition-all group relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-primary/10 p-3 rounded-lg text-primary">
                      <span className="material-symbols-outlined text-2xl">school</span>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDeleteClass(cls.id); }}
                      className="text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                  <h3 className="text-xl font-bold dark:text-white mb-1">{cls.name}</h3>
                  <p className="text-slate-500 dark:text-[#92b7c9] text-sm mb-4">
                    {cls.students.length} Students • Created {new Date(cls.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex -space-x-2 overflow-hidden mb-4">
                    {cls.students.slice(0, 5).map((s, i) => (
                      <div key={s.id} className="inline-block h-8 w-8 rounded-full bg-slate-100 ring-2 ring-white dark:ring-[#111c22] flex items-center justify-center text-xs font-bold text-slate-600">
                        {s.firstName[0]}
                      </div>
                    ))}
                    {cls.students.length > 5 && (
                      <div className="inline-block h-8 w-8 rounded-full bg-slate-100 ring-2 ring-white dark:ring-[#111c22] flex items-center justify-center text-xs font-bold text-slate-600">
                        +{cls.students.length - 5}
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={() => {
                        setClassName(cls.name);
                        setStudents(cls.students);
                        setView('create');
                    }}
                    className="w-full py-2 rounded-lg border border-slate-200 dark:border-[#233c48] text-sm font-semibold hover:bg-slate-50 dark:hover:bg-[#233c48] transition-colors dark:text-white"
                  >
                    Edit List
                  </button>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-[#111c22] border border-slate-200 dark:border-[#233c48] rounded-2xl p-8 shadow-sm">
              <div className="mb-8">
                <label className="block text-sm font-bold text-slate-700 dark:text-[#92b7c9] mb-2">Class Name</label>
                <input 
                  type="text" 
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  placeholder="e.g., Grade 4 - Math"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-[#233c48] bg-slate-50 dark:bg-[#1a2b34] dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                />
              </div>

              <div className="mb-8">
                <label className="block text-sm font-bold text-slate-700 dark:text-[#92b7c9] mb-2">Add Students</label>
                
                {/* Bulk Paste Area */}
                <div className="mb-4">
                    <div className="relative">
                        <textarea
                            value={bulkText}
                            onChange={(e) => setBulkText(e.target.value)}
                            placeholder={`Paste list here...\nJohn Doe\nJane Smith\nEldrex`}
                            className="w-full h-32 px-4 py-3 rounded-xl border border-slate-200 dark:border-[#233c48] bg-slate-50 dark:bg-[#1a2b34] dark:text-white text-sm focus:ring-2 focus:ring-primary outline-none resize-none"
                        />
                        <button 
                            onClick={handleBulkAdd}
                            disabled={!bulkText.trim()}
                            className="absolute bottom-3 right-3 bg-slate-800 dark:bg-slate-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg disabled:opacity-50"
                        >
                            Bulk Add
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">Or add manually</div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs font-bold text-primary flex items-center gap-1 hover:bg-primary/5 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">upload_file</span>
                      Import Excel/CSV
                    </button>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept=".xlsx, .xls, .csv" 
                      onChange={handleFileUpload}
                    />
                  </div>
                </div>

                {/* Manual Entry */}
                <div className="flex flex-col md:flex-row gap-2 mb-4 bg-slate-50 dark:bg-[#1a2b34] p-3 rounded-xl">
                  <input 
                    type="text" 
                    value={manualFirstName}
                    onChange={(e) => setManualFirstName(e.target.value)}
                    placeholder="First Name"
                    className="flex-1 px-4 py-2 rounded-lg border border-slate-200 dark:border-[#233c48] bg-white dark:bg-[#111c22] dark:text-white text-sm outline-none"
                    onKeyDown={(e) => e.key === 'Enter' && addManualStudent()}
                  />
                  <input 
                    type="text" 
                    value={manualLastName}
                    onChange={(e) => setManualLastName(e.target.value)}
                    placeholder="Last Name"
                    className="flex-1 px-4 py-2 rounded-lg border border-slate-200 dark:border-[#233c48] bg-white dark:bg-[#111c22] dark:text-white text-sm outline-none"
                    onKeyDown={(e) => e.key === 'Enter' && addManualStudent()}
                  />
                  <select 
                    value={manualSkill}
                    onChange={(e) => setManualSkill(e.target.value as any)}
                    className="px-4 py-2 rounded-lg border border-slate-200 dark:border-[#233c48] bg-white dark:bg-[#111c22] dark:text-white text-sm outline-none"
                  >
                    <option value="low">Low Skill</option>
                    <option value="medium">Medium Skill</option>
                    <option value="high">High Skill</option>
                  </select>
                  <button 
                    onClick={addManualStudent}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:brightness-110 transition-all font-bold text-sm"
                  >
                    Add
                  </button>
                </div>

                {/* Student List */}
                <div className="bg-slate-50 dark:bg-[#0f181e] rounded-xl border border-slate-200 dark:border-[#233c48] max-h-[400px] overflow-y-auto custom-scrollbar">
                  {students.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 text-sm">
                      No students added yet. <br/> Import a file, paste a list, or add manually above.
                    </div>
                  ) : (
                    <table className="w-full text-left text-sm">
                      <thead className="sticky top-0 bg-slate-100 dark:bg-[#1a2b34] text-slate-500 dark:text-[#92b7c9]">
                        <tr>
                          <th className="px-4 py-3 font-medium">Name</th>
                          <th className="px-4 py-3 font-medium">Skill Level</th>
                          <th className="px-4 py-3 w-10"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map((student, idx) => (
                          <tr key={student.id} className="border-b border-slate-100 dark:border-[#233c48] last:border-0 hover:bg-white dark:hover:bg-[#111c22] transition-colors">
                            <td className="px-4 py-3 font-bold dark:text-white">{student.firstName} {student.lastName}</td>
                            <td className="px-4 py-3">
                               <select 
                                 value={student.skillLevel || 'medium'}
                                 onChange={(e) => updateStudentSkill(student.id, e.target.value as any)}
                                 className={`text-xs font-bold uppercase py-1 px-2 rounded border-none cursor-pointer focus:ring-0 ${
                                     student.skillLevel === 'high' ? 'bg-purple-100 text-purple-700' :
                                     student.skillLevel === 'low' ? 'bg-orange-100 text-orange-700' :
                                     'bg-blue-100 text-blue-700'
                                 }`}
                               >
                                   <option value="high">High</option>
                                   <option value="medium">Medium</option>
                                   <option value="low">Low</option>
                               </select>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <button 
                                onClick={() => handleRemoveStudent(student.id)}
                                className="text-slate-400 hover:text-red-500"
                              >
                                <span className="material-symbols-outlined text-lg">close</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-[#233c48]">
                <button 
                  onClick={() => { setView('list'); resetForm(); }}
                  className="px-6 py-3 rounded-xl font-bold text-slate-600 dark:text-white hover:bg-slate-100 dark:hover:bg-[#233c48] transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveClass}
                  className="px-6 py-3 rounded-xl font-bold bg-primary text-white shadow-lg shadow-primary/20 hover:brightness-110 transition-all"
                >
                  Save Class List
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
