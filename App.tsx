
import React, { useState, useEffect, useCallback } from 'react';
import { 
  DIMENSIONS as initialDimensions, 
  VERTICALS, 
  DEFAULT_DIMENSION_WEIGHTS, 
  VERTICAL_OVERRIDES, 
  INITIAL_QUESTION_BANK, 
} from './constants';
import { QuestionBank, DimensionScores, CustomWeights } from './types';
import SummaryDashboard from './components/SummaryDashboard';
import QuestionSet from './components/QuestionSet';
import AdminPanel from './components/AdminPanel';
import SetupTab from './components/SetupTab';
import AdminLogin from './components/AdminLogin';

const App: React.FC = () => {
  // Navigation and Selection State (Memory only, resets on refresh)
  const [activeTab, setActiveTab] = useState<string>('Setup');
  const [vertical, setVertical] = useState<string>(VERTICALS[0]);
  const [subVertical, setSubVertical] = useState<string>('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  
  // Assessment Data State (Memory only, resets on refresh)
  const [clientInfo, setClientInfo] = useState<{ userName: string, companyName: string }>({ 
    userName: '', 
    companyName: '' 
  });

  const [dimensions, setDimensions] = useState<string[]>(initialDimensions);
  const [deletedDimensions, setDeletedDimensions] = useState<string[]>([]);
  const [deletedQuestions, setDeletedQuestions] = useState<string[]>([]);
  
  const [questionBank, setQuestionBank] = useState<QuestionBank>(INITIAL_QUESTION_BANK);
  const [dimensionScores, setDimensionScores] = useState<DimensionScores>({});

  // Individual question responses - kept in global state to persist across tab switches
  const [responses, setResponses] = useState<Record<string, number>>({});

  const [customWeights, setCustomWeights] = useState<CustomWeights>(() => {
    const initialWeights: CustomWeights = {};
    VERTICALS.forEach((v) => {
      initialWeights[v] = {};
      initialDimensions.forEach((dim) => {
        const overrides = VERTICAL_OVERRIDES[v] || {};
        initialWeights[v][dim] = overrides[dim] ?? DEFAULT_DIMENSION_WEIGHTS[dim] ?? 10;
      });
    });
    return initialWeights;
  });

  // Ensure active tab is valid if dimensions are modified in Admin
  useEffect(() => {
    const nonDimensionTabs = ['ADMIN', 'Summary', 'Setup'];
    if (!nonDimensionTabs.includes(activeTab) && !dimensions.includes(activeTab)) {
      setActiveTab('Setup');
    }
  }, [dimensions, activeTab]);

  // Sync sub-vertical availability when navigating dimensions or verticals
  useEffect(() => {
    const dimData = questionBank[activeTab];
    if (dimData && dimData[vertical]) {
      const subs = Object.keys(dimData[vertical].subVerticals || {});
      if (subVertical !== '' && !subs.includes(subVertical)) {
        setSubVertical(subs.length > 0 ? subs[0] : '');
      }
    } else {
      if (!['Setup', 'ADMIN', 'Summary'].includes(activeTab)) {
        setSubVertical('');
      }
    }
  }, [activeTab, vertical, questionBank, subVertical]);

  const handleResponseUpdate = useCallback((questionId: string, score: number) => {
    setResponses(prev => ({ ...prev, [questionId]: score }));
  }, []);

  const handleDimensionScoreUpdate = useCallback((dim: string, score: number) => {
    setDimensionScores(prev => ({ ...prev, [dim]: score }));
  }, []);

  const handleWeightChange = (v: string, dim: string, weight: number) => {
    setCustomWeights(prev => ({
      ...prev,
      [v]: { ...prev[v], [dim]: weight }
    }));
  };

  const isSetup = activeTab === 'Setup';
  const isAdmin = activeTab === 'ADMIN';
  const isSummary = activeTab === 'Summary';
  const isDimensionTab = !isAdmin && !isSummary && !isSetup;

  const completionCount = dimensions.filter(d => dimensionScores[d] !== undefined).length;
  const progressPercent = Math.round((completionCount / (dimensions.length || 1)) * 100);

  return (
    <div className="flex flex-col h-screen max-h-screen bg-slate-50 font-sans overflow-hidden">
      <header className="bg-white px-10 py-5 flex items-center justify-between shrink-0 no-print z-20 shadow-sm border-b border-slate-100">
        <div className="flex items-center gap-10">
          <div className="flex flex-col">
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1.5">
              Tech <span className="text-red-600">Mahindra</span>
            </h1>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">Advisory Toolkit</p>
          </div>
          
          {clientInfo.companyName && (
            <div className="hidden lg:flex items-center gap-4 border-l border-slate-100 pl-8">
              <div className="flex flex-col">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Organization Cluster</span>
                <span className="text-[11px] font-bold text-slate-800 tracking-tight">{clientInfo.companyName}</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-10">
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-3 mb-1.5">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Workspace Load</span>
              <span className="text-[11px] font-bold text-slate-900">{progressPercent}%</span>
            </div>
            <div className="w-48 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-600 transition-all duration-1000 ease-in-out shadow-[0_0_8px_rgba(220,38,38,0.4)]"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
          
          <button
            onClick={() => setActiveTab('ADMIN')}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-premium ${
              activeTab === 'ADMIN' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
            }`}
            title="Toolkit Settings"
          >
            <i className="fa-solid fa-sliders text-sm"></i>
          </button>
        </div>
      </header>

      <nav className="bg-white border-b border-slate-100 px-10 py-2 flex gap-1.5 overflow-x-auto no-scrollbar no-print shrink-0 items-center">
        <button
          onClick={() => setActiveTab('Setup')}
          className={`px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-premium shrink-0 flex items-center gap-2.5 ${
            activeTab === 'Setup' 
            ? 'bg-slate-900 text-white shadow-md' 
            : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'
          }`}
        >
          <i className="fa-solid fa-power-off text-[9px]"></i>
          Initiation
        </button>
        <div className="w-px h-4 bg-slate-100 mx-2"></div>
        {dimensions.map(dim => {
          const isCompleted = dimensionScores[dim] !== undefined;
          const isActive = activeTab === dim;
          return (
            <button
              key={dim}
              onClick={() => setActiveTab(dim)}
              className={`px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-premium shrink-0 flex items-center gap-2.5 border border-transparent ${
                isActive 
                ? 'bg-red-50 border-red-100 text-red-600' 
                : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              {isCompleted && <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-red-600 animate-pulse' : 'bg-emerald-500'}`}></div>}
              {dim}
            </button>
          );
        })}
        <div className="w-px h-4 bg-slate-100 mx-2"></div>
        <button
          onClick={() => setActiveTab('Summary')}
          className={`px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-premium shrink-0 border-2 ${
            activeTab === 'Summary' 
            ? 'bg-red-600 border-red-600 text-white shadow-xl shadow-red-100' 
            : 'text-slate-900 border-slate-900 hover:bg-slate-900 hover:text-white'
          }`}
        >
          Strategy Board
        </button>
      </nav>

      <main className="flex-grow overflow-hidden flex flex-col p-10 pt-8">
        <div className="max-w-7xl mx-auto w-full flex flex-col h-full">
          {!isAdmin && !isSummary && (
            <div className="mb-10 shrink-0 animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.3em]">
                      {isSetup ? 'Phase 01: Onboarding' : 'Phase 02: Maturity Assessment'}
                    </span>
                    <div className="h-px w-10 bg-red-100"></div>
                  </div>
                  <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">
                    {isSetup ? 'Engagement Initiation' : activeTab}
                  </h2>
                </div>

                {isDimensionTab && (
                  <div className="flex items-center gap-3 no-print">
                    <div className="bg-white px-6 py-4 rounded-3xl shadow-premium border border-slate-100 flex items-center gap-8">
                      <div className="flex flex-col">
                        <label className="text-[9px] uppercase text-slate-400 font-black mb-1.5 tracking-widest">Target Vertical</label>
                        <select 
                          value={vertical}
                          onChange={(e) => setVertical(e.target.value)}
                          className="bg-transparent text-[13px] font-black text-slate-900 outline-none cursor-pointer appearance-none pr-4"
                        >
                          {VERTICALS.map(v => <option key={v} value={v}>{v}</option>)}
                        </select>
                      </div>
                      <div className="w-px h-8 bg-slate-100"></div>
                      <div className="flex flex-col min-w-[140px]">
                        <label className="text-[9px] uppercase text-slate-400 font-black mb-1.5 tracking-widest">Cluster Context</label>
                        <select 
                          value={subVertical}
                          onChange={(e) => setSubVertical(e.target.value)}
                          className="bg-transparent text-[13px] font-black text-slate-900 outline-none cursor-pointer appearance-none pr-4"
                        >
                          <option value="">Core Indicators</option>
                          {Object.keys(questionBank[activeTab]?.[vertical]?.subVerticals || {}).map(sv => (
                            <option key={sv} value={sv}>{sv}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex-grow overflow-y-auto pr-4 custom-scrollbar-themed pb-20">
            {isSetup && (
              <SetupTab clientInfo={clientInfo} setClientInfo={setClientInfo} onContinue={() => setActiveTab(dimensions[0])} />
            )}

            {isDimensionTab && (
              <QuestionSet 
                dimension={activeTab}
                vertical={vertical}
                subVertical={subVertical}
                questionBank={questionBank}
                responses={responses}
                onUpdateResponse={handleResponseUpdate}
                onUpdateDimensionScore={handleDimensionScoreUpdate}
                deletedQuestions={deletedQuestions}
              />
            )}

            {isSummary && (
              <SummaryDashboard 
                dimensions={dimensions}
                vertical={vertical}
                dimensionScores={dimensionScores}
                customWeights={customWeights[vertical] || {}}
                clientInfo={clientInfo}
                onWeightChange={(dim, weight) => handleWeightChange(vertical, dim, weight)}
              />
            )}

            {isAdmin && (
              isAdminAuthenticated ? (
                <AdminPanel 
                  dimensions={dimensions}
                  setDimensions={setDimensions}
                  deletedDimensions={deletedDimensions}
                  setDeletedDimensions={setDeletedDimensions}
                  deletedQuestions={deletedQuestions}
                  setDeletedQuestions={setDeletedQuestions}
                  verticals={VERTICALS}
                  questionBank={questionBank}
                  setQuestionBank={setQuestionBank}
                />
              ) : (
                <AdminLogin onAuthenticated={() => setIsAdminAuthenticated(true)} />
              )
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
