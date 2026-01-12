
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { QuestionBank, Question } from '../types';
import { DIMENSIONS as STANDARD_DIMENSIONS, INITIAL_QUESTION_BANK } from '../constants';

interface AdminPanelProps {
  dimensions: string[];
  setDimensions: React.Dispatch<React.SetStateAction<string[]>>;
  deletedDimensions: string[];
  setDeletedDimensions: React.Dispatch<React.SetStateAction<string[]>>;
  deletedQuestions: string[];
  setDeletedQuestions: React.Dispatch<React.SetStateAction<string[]>>;
  verticals: string[];
  questionBank: QuestionBank;
  setQuestionBank: React.Dispatch<React.SetStateAction<QuestionBank>>;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  dimensions, setDimensions, 
  deletedDimensions, setDeletedDimensions,
  deletedQuestions, setDeletedQuestions,
  verticals, questionBank, setQuestionBank 
}) => {
  const [newDim, setNewDim] = useState('');
  
  const allAvailableDimensions = useMemo(() => {
    return Array.from(new Set([...dimensions, ...deletedDimensions])).sort();
  }, [dimensions, deletedDimensions]);

  const [selectedDim, setSelectedDim] = useState(allAvailableDimensions[0] || '');
  const [selectedVert, setSelectedVert] = useState(verticals[0] || '');
  const [selectedSubVert, setSelectedSubVert] = useState('Core');
  const [newQuestionText, setNewQuestionText] = useState('');

  // Get dynamic sub-verticals for the selected dim/vert
  const availableSubVerticals = useMemo(() => {
    const data = questionBank[selectedDim]?.[selectedVert];
    if (!data || !data.subVerticals) return [];
    return Object.keys(data.subVerticals);
  }, [questionBank, selectedDim, selectedVert]);

  useEffect(() => {
    if (allAvailableDimensions.length > 0 && !allAvailableDimensions.includes(selectedDim)) {
      setSelectedDim(allAvailableDimensions[0]);
    }
  }, [allAvailableDimensions, selectedDim]);

  // Reset sub-vertical target when dim/vert changes
  useEffect(() => {
    setSelectedSubVert('Core');
  }, [selectedDim, selectedVert]);

  const addDimension = useCallback(() => {
    const trimmed = newDim.trim();
    if (!trimmed) return;
    if (dimensions.includes(trimmed) || deletedDimensions.includes(trimmed)) {
      alert("Dimension already exists in workspace.");
      return;
    }
    setDimensions(prev => [...prev, trimmed]);
    setNewDim('');
  }, [newDim, dimensions, deletedDimensions, setDimensions]);

  const archiveDimension = useCallback((dimName: string) => {
    setDimensions(current => current.filter(d => d !== dimName));
    setDeletedDimensions(prev => prev.includes(dimName) ? prev : [...prev, dimName]);
  }, [setDimensions, setDeletedDimensions]);

  const restoreDimension = useCallback((dimName: string) => {
    setDeletedDimensions(prev => prev.filter(d => d !== dimName));
    setDimensions(current => current.includes(dimName) ? current : [...current, dimName]);
  }, [setDimensions, setDeletedDimensions]);

  const deleteDimensionPermanently = useCallback((dimName: string) => {
    setDeletedDimensions(prev => prev.filter(d => d !== dimName));
    setDimensions(prev => prev.filter(d => d !== dimName));
    
    setQuestionBank(prev => {
      const next = { ...prev };
      if (next[dimName]) delete next[dimName];
      return next;
    });
  }, [setDeletedDimensions, setDimensions, setQuestionBank]);

  const addQuestion = useCallback(() => {
    if (!newQuestionText || !selectedDim || !selectedVert) return;
    const text = newQuestionText.trim();
    
    setQuestionBank(prev => {
      const dimData = { ...(prev[selectedDim] || {}) };
      const vertData = { ...(dimData[selectedVert] || { top3: [], subVerticals: {} }) };
      
      const newQuestion: Question = {
        id: `q-${Date.now()}`,
        text: text,
        weight: 5
      };

      if (selectedSubVert === 'Core') {
        vertData.top3 = [...vertData.top3, newQuestion];
      } else {
        const currentSubs = { ...vertData.subVerticals };
        currentSubs[selectedSubVert] = [...(currentSubs[selectedSubVert] || []), newQuestion];
        vertData.subVerticals = currentSubs;
      }

      return {
        ...prev,
        [selectedDim]: {
          ...dimData,
          [selectedVert]: vertData
        }
      };
    });
    setNewQuestionText('');
  }, [newQuestionText, selectedDim, selectedVert, selectedSubVert, setQuestionBank]);

  const restoreDefaults = useCallback(() => {
    if (window.confirm("This will replace all your custom benchmarks and track additions with the factory default set. Your current assessment scores will be reset. Proceed?")) {
      // Clear all local storage keys related to the app to ensure fresh state
      localStorage.removeItem('gcc_question_bank');
      localStorage.removeItem('gcc_dimensions_list');
      localStorage.removeItem('gcc_deleted_dimensions');
      localStorage.removeItem('gcc_deleted_questions');
      localStorage.removeItem('gcc_dimension_scores');
      
      setQuestionBank(INITIAL_QUESTION_BANK);
      setDimensions(STANDARD_DIMENSIONS);
      setDeletedDimensions([]);
      setDeletedQuestions([]);
      
      // Force page reload to ensure App state is clean
      window.location.reload();
    }
  }, [setQuestionBank, setDimensions, setDeletedDimensions, setDeletedQuestions]);

  /**
   * Aggregates ALL questions for the selected Dimension and Vertical.
   * Includes Core (top3) and all Sub-Vertical questions.
   */
  const getAllQuestionsForVertical = () => {
    const data = questionBank[selectedDim]?.[selectedVert];
    if (!data) return [];
    
    const coreQs = data.top3.map(q => ({ ...q, category: 'Core' }));
    
    const subQs = Object.entries(data.subVerticals).flatMap(([subName, qs]) => 
      (qs as Question[]).map(q => ({ ...q, category: subName }))
    );

    return [...coreQs, ...subQs];
  };

  const allQuestions = getAllQuestionsForVertical();
  const activeQs = allQuestions.filter(q => !deletedQuestions.includes(q.id));
  const hiddenQs = allQuestions.filter(q => deletedQuestions.includes(q.id));

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-40">
      {/* DIMENSION MANAGEMENT SECTION */}
      <section className="bg-white p-12 rounded-[40px] border border-slate-100 shadow-premium relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-900"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Dimension Orchestration</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Global Track Management</p>
          </div>
          <div className="flex gap-4 items-center">
            <button 
              onClick={restoreDefaults}
              className="px-4 py-2 text-[9px] font-black uppercase text-red-600 border border-red-100 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
            >
              <i className="fa-solid fa-rotate-left mr-2"></i>
              Restore Defaults
            </button>
            <div className="flex bg-slate-50 p-2 rounded-2xl border border-slate-100 w-full md:w-auto">
              <input 
                type="text" 
                placeholder="Inject new track..."
                value={newDim}
                onChange={(e) => setNewDim(e.target.value)}
                className="bg-transparent px-4 py-2 text-xs font-black uppercase tracking-widest outline-none flex-grow md:w-64"
              />
              <button onClick={addDimension} className="bg-slate-900 text-white px-8 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all">Add Track</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                Active Assessment Tracks
              </h4>
              <span className="text-[10px] font-black bg-slate-100 px-3 py-1 rounded-full text-slate-500">{dimensions.length}</span>
            </div>
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-6 custom-scrollbar-themed">
              {dimensions.map(dim => (
                <div key={dim} className="group flex justify-between items-center bg-slate-50/50 p-5 rounded-[24px] border border-slate-100 hover:bg-white hover:border-red-100 hover:shadow-premium transition-all">
                  <span className="text-[11px] font-black text-slate-700 uppercase tracking-widest">{dim}</span>
                  <button onClick={() => archiveDimension(dim)} className="text-slate-300 hover:text-red-600 p-2 transition-colors">
                    <i className="fa-solid fa-box-archive text-xs"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <i className="fa-solid fa-vault text-[10px]"></i>
                Archived Tracks
              </h4>
              <span className="text-[10px] font-black bg-slate-50 px-3 py-1 rounded-full text-slate-300">{deletedDimensions.length}</span>
            </div>
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-6 custom-scrollbar-themed">
              {deletedDimensions.map(dim => {
                const isStandard = STANDARD_DIMENSIONS.includes(dim);
                return (
                  <div key={dim} className="bg-white border border-slate-100 border-dashed p-5 rounded-[24px] flex justify-between items-center opacity-60 hover:opacity-100 transition-all">
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest italic">{dim}</span>
                    <div className="flex items-center gap-4">
                      <button onClick={() => restoreDimension(dim)} className="text-emerald-600 font-black text-[9px] uppercase tracking-widest hover:underline">Restore</button>
                      {!isStandard && (
                        <button onClick={() => deleteDimensionPermanently(dim)} className="text-red-600 font-black text-[9px] uppercase tracking-widest hover:underline">Delete</button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* QUESTION BANK SECTION */}
      <section className="bg-white p-12 rounded-[40px] border border-slate-100 shadow-premium relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-red-600"></div>
        <div className="mb-12">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">Benchmark Repository</h3>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Viewing all markers for the selected vertical cluster</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="space-y-4">
            <label className="text-[9px] uppercase text-slate-400 font-black tracking-widest ml-1">Dimension Track</label>
            <select value={selectedDim} onChange={(e) => setSelectedDim(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-[24px] p-5 text-[11px] font-black uppercase tracking-widest text-slate-700 outline-none focus:ring-2 focus:ring-red-100 transition-all">
              {allAvailableDimensions.map(d => (
                <option key={d} value={d}>{deletedDimensions.includes(d) ? `[ARCHIVED] ${d}` : d}</option>
              ))}
            </select>
          </div>
          <div className="space-y-4">
            <label className="text-[9px] uppercase text-slate-400 font-black tracking-widest ml-1">Vertical Market</label>
            <select value={selectedVert} onChange={(e) => setSelectedVert(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-[24px] p-5 text-[11px] font-black uppercase tracking-widest text-slate-700 outline-none focus:ring-2 focus:ring-red-100 transition-all">
              {verticals.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div className="space-y-4">
            <label className="text-[9px] uppercase text-slate-400 font-black tracking-widest ml-1">Injection Target (Sub-Vertical)</label>
            <select value={selectedSubVert} onChange={(e) => setSelectedSubVert(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-[24px] p-5 text-[11px] font-black uppercase tracking-widest text-slate-700 outline-none focus:ring-2 focus:ring-red-100 transition-all">
              <option value="Core">Core Maturity Indicators</option>
              {availableSubVerticals.map(sv => <option key={sv} value={sv}>{sv}</option>)}
            </select>
          </div>
        </div>

        <div className="space-y-4 mb-12">
          <label className="text-[9px] uppercase text-slate-400 font-black tracking-widest ml-1">New Maturity Marker for {selectedSubVert}</label>
          <div className="relative">
            <textarea 
              rows={3} 
              value={newQuestionText} 
              onChange={(e) => setNewQuestionText(e.target.value)} 
              placeholder={`Type a maturity benchmark to inject into the ${selectedSubVert} cluster...`} 
              className="w-full bg-slate-50 border border-slate-100 rounded-[32px] p-8 text-sm font-medium focus:ring-4 focus:ring-red-50 outline-none resize-none pr-40 transition-all"
            ></textarea>
            <button onClick={addQuestion} className="absolute bottom-6 right-6 bg-slate-900 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-all">Inject Marker</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Active Vertical Benchmarks</h4>
              <span className="text-[10px] font-black bg-slate-100 px-3 py-1 rounded-full text-slate-500">{activeQs.length}</span>
            </div>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-6 custom-scrollbar-themed">
              {activeQs.map(q => (
                <div key={q.id} className="bg-slate-50/50 border border-slate-100 p-6 rounded-[32px] flex justify-between items-start gap-6 group hover:bg-white hover:border-slate-200 transition-all">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                       <span className={`text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border ${
                         q.category === 'Core' ? 'bg-red-50 border-red-100 text-red-600' : 'bg-slate-900 border-slate-800 text-white'
                       }`}>
                         {q.category}
                       </span>
                    </div>
                    <p className="text-xs text-slate-600 font-bold leading-relaxed">{q.text}</p>
                  </div>
                  <button onClick={() => setDeletedQuestions(prev => [...prev, q.id])} className="text-slate-300 hover:text-red-600 p-1 opacity-0 group-hover:opacity-100 transition-all shrink-0 mt-1">
                    <i className="fa-solid fa-eye-slash text-xs"></i>
                  </button>
                </div>
              ))}
              {activeQs.length === 0 && <p className="text-xs text-slate-300 italic text-center py-10">No markers found for this vertical.</p>}
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hidden Markers (Vertical Archive)</h4>
              <span className="text-[10px] font-black bg-slate-50 px-3 py-1 rounded-full text-slate-300">{hiddenQs.length}</span>
            </div>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-6 custom-scrollbar-themed">
              {hiddenQs.map(q => (
                <div key={q.id} className="bg-white border border-slate-100 border-dashed p-6 rounded-[32px] flex justify-between items-start gap-6 opacity-60">
                  <div className="space-y-2">
                    <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest border border-slate-100 px-2 py-0.5 rounded">{q.category}</span>
                    <p className="text-xs text-slate-400 italic leading-relaxed">{q.text}</p>
                  </div>
                  <button onClick={() => setDeletedQuestions(prev => prev.filter(id => id !== q.id))} className="text-red-600 font-black text-[9px] uppercase tracking-widest hover:underline shrink-0 mt-1">Restore</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminPanel;
