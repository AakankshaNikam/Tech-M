
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

// --- TYPES ---
export interface Question { id: string; text: string; weight: number; }
export interface VerticalData { top3: Question[]; subVerticals: Record<string, Question[]>; }
export interface QuestionBank { [dimensionName: string]: Record<string, VerticalData>; }
export interface JustificationLevel { level: number; title: string; }
export interface DimensionScores { [dimensionName: string]: number; }
export interface CustomWeights { [verticalName: string]: { [dimensionName: string]: number }; }

// --- CONSTANTS ---
export const DIMENSIONS = [
  'Vision & Governance', 'Business Process Maturity', 'Digital & Automation', 
  'Talent Management', 'Technology & Tools', 'Customer Centricity', 
  'Innovation & IP', 'Ecosystem & Partnerships', 'Risk & Compliance', 
  'Sustainability', 'Organization Agility'
];

export const VERTICALS = [
  'Manufacturing', 'BFSI', 'Healthcare & Life Sciences', 
  'Retail & Consumer', 'TMT', 'Energy & Utilities'
];

export const VG_JUSTIFICATIONS: JustificationLevel[] = [
  { level: 1, title: 'LEVEL 1 – Ad-hoc' },
  { level: 2, title: 'LEVEL 2 – Basic' },
  { level: 3, title: 'LEVEL 3 – Defined' },
  { level: 4, title: 'LEVEL 4 – Managed' },
  { level: 5, title: 'LEVEL 5 – Optimized' }
];

// Helper to build core questions (Sample data for consolidation)
const buildCore = (p: string) => [
  { id: `${p}-1`, text: `How clearly is the strategic vision defined for this ${p} track?`, weight: 5 },
  { id: `${p}-2`, text: `Are there documented KPIs and governance for ${p} operations?`, weight: 4 },
  { id: `${p}-3`, text: `How effectively is technology leveraged in this ${p} dimension?`, weight: 5 }
];

const INITIAL_BANK: QuestionBank = {};
DIMENSIONS.forEach(d => {
  INITIAL_BANK[d] = {};
  VERTICALS.forEach(v => {
    INITIAL_BANK[d][v] = { top3: buildCore(d.toLowerCase().replace(/ /g, '-')), subVerticals: {} };
  });
});

// --- COMPONENTS ---

const QuestionItem: React.FC<{ number: number; question: string; score: number; onScoreChange: (s: number) => void; }> = ({ number, question, score, onScoreChange }) => (
  <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 mb-6">
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">Marker {number.toString().padStart(2, '0')}</span>
        <p className="text-slate-800 text-lg font-bold leading-tight">{question}</p>
      </div>
      <div className="grid grid-cols-5 gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
        {[1,2,3,4,5].map(lvl => (
          <button
            key={lvl}
            onClick={() => onScoreChange(lvl)}
            className={`py-3 rounded-xl text-[10px] font-black transition-all ${score === lvl ? 'bg-red-600 text-white shadow-lg' : 'text-slate-400 hover:bg-white'}`}
          >
            LVL {lvl}
          </button>
        ))}
      </div>
    </div>
  </div>
);

const SummaryDashboard: React.FC<{ dimensions: string[]; scores: DimensionScores; client: any; }> = ({ dimensions, scores, client }) => {
  const avg = useMemo(() => {
    // Cast Object.values to number[] to ensure that reduce operations are valid in all environments
    const s = Object.values(scores) as number[];
    return s.length ? s.reduce((a, b) => a + b, 0) / s.length : 0;
  }, [scores]);

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <div className="bg-slate-900 rounded-[3rem] p-12 text-white flex justify-between items-center border border-slate-800">
        <div>
          <h2 className="text-[80px] font-black tracking-tighter text-red-500 leading-none">{avg.toFixed(2)}</h2>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mt-4">Aggregate Maturity Index</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-black text-white">{client.companyName || 'Corporate Client'}</p>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Strategic Audit Result</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dimensions.map(d => (
          <div key={d} className="bg-white p-6 rounded-3xl border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{d}</span>
              <span className="text-sm font-black text-slate-900">{(scores[d] || 0).toFixed(1)}</span>
            </div>
            <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
              <div className="h-full bg-red-600" style={{ width: `${((scores[d] || 0) / 5) * 100}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- MAIN APP ---

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Setup');
  const [clientInfo, setClientInfo] = useState({ userName: '', companyName: '' });
  const [scores, setScores] = useState<DimensionScores>({});
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [vertical, setVertical] = useState(VERTICALS[0]);

  const updateResponse = (id: string, s: number, dim: string) => {
    const newResponses = { ...responses, [id]: s };
    setResponses(newResponses);
    
    // Auto-calculate dimension score
    const dimQuestions = INITIAL_BANK[dim]?.[vertical]?.top3 || [];
    const sum = dimQuestions.reduce((acc, q) => acc + (newResponses[q.id] || 3), 0);
    setScores(prev => ({ ...prev, [dim]: sum / dimQuestions.length }));
  };

  const progress = Math.round((Object.keys(scores).length / DIMENSIONS.length) * 100);

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden font-sans">
      <header className="bg-white px-10 py-6 border-b border-slate-100 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-10">
          <h1 className="text-xl font-black tracking-tighter">TECH <span className="text-red-600">MAHINDRA</span></h1>
          {clientInfo.companyName && <span className="text-[10px] font-bold text-slate-400 border-l border-slate-200 pl-8 uppercase tracking-widest">{clientInfo.companyName}</span>}
        </div>
        <div className="flex items-center gap-6">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Progress {progress}%</span>
          <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-red-600" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b border-slate-100 px-10 py-3 flex gap-2 overflow-x-auto no-scrollbar shrink-0">
        <button onClick={() => setActiveTab('Setup')} className={`px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider ${activeTab === 'Setup' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:bg-slate-50'}`}>Initiation</button>
        {DIMENSIONS.map(d => (
          <button key={d} onClick={() => setActiveTab(d)} className={`px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider ${activeTab === d ? 'bg-red-50 text-red-600' : 'text-slate-400 hover:bg-slate-50'}`}>{d}</button>
        ))}
        <button onClick={() => setActiveTab('Summary')} className={`px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider border-2 ${activeTab === 'Summary' ? 'bg-red-600 border-red-600 text-white shadow-lg' : 'border-slate-900 text-slate-900'}`}>Summary</button>
      </nav>

      <main className="flex-grow overflow-y-auto p-10 custom-scrollbar-themed">
        <div className="max-w-5xl mx-auto">
          {activeTab === 'Setup' && (
            <div className="bg-white rounded-[3rem] p-16 shadow-premium border border-slate-100 flex flex-col items-center text-center">
              <h2 className="text-4xl font-black text-slate-900 mb-8 tracking-tighter leading-none">Strategic Assessment <br/><span className="text-red-600">Onboarding</span></h2>
              <div className="w-full max-w-md space-y-6">
                <input type="text" placeholder="Consultant Name" value={clientInfo.userName} onChange={e => setClientInfo({...clientInfo, userName: e.target.value})} className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-red-50" />
                <input type="text" placeholder="Client Organization" value={clientInfo.companyName} onChange={e => setClientInfo({...clientInfo, companyName: e.target.value})} className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-red-50" />
                <button onClick={() => setActiveTab(DIMENSIONS[0])} disabled={!clientInfo.companyName} className="w-full bg-red-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl disabled:opacity-20 transition-all">Start Assessment</button>
              </div>
            </div>
          )}

          {DIMENSIONS.includes(activeTab) && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-end mb-12 border-b border-slate-100 pb-8">
                <div>
                  <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{activeTab}</h3>
                  <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.3em] mt-2">Dimension Analysis Phase</p>
                </div>
                <select value={vertical} onChange={e => setVertical(e.target.value)} className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest outline-none">
                  {VERTICALS.map(v => <option key={v}>{v}</option>)}
                </select>
              </div>
              {INITIAL_BANK[activeTab]?.[vertical]?.top3.map((q, i) => (
                <QuestionItem key={q.id} number={i + 1} question={q.text} score={responses[q.id] || 3} onScoreChange={(s) => updateResponse(q.id, s, activeTab)} />
              ))}
            </div>
          )}

          {activeTab === 'Summary' && <SummaryDashboard dimensions={DIMENSIONS} scores={scores} client={clientInfo} />}
        </div>
      </main>
    </div>
  );
};

// Mount App
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
