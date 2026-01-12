
import React from 'react';

interface SetupTabProps {
  clientInfo: { userName: string, companyName: string };
  setClientInfo: React.Dispatch<React.SetStateAction<{ userName: string, companyName: string }>>;
  onContinue: () => void;
}

const SetupTab: React.FC<SetupTabProps> = ({ clientInfo, setClientInfo, onContinue }) => {
  return (
    <div className="max-w-4xl mx-auto py-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden bg-white rounded-[3rem] border border-slate-100 shadow-premium-lg">
        
        {/* Left Side: Branded Hero Section */}
        <div className="bg-slate-900 p-16 flex flex-col justify-between relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-red-600/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-red-600/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-12">
              <div className="flex flex-col">
                <h1 className="text-3xl font-black tracking-tighter text-white flex items-center gap-2">
                  Tech <span className="text-red-500">Mahindra</span>
                </h1>
                <div className="h-1 w-12 bg-red-500 rounded-full mt-1"></div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-5xl font-black text-white leading-[1.1] tracking-tighter">
                MATURITY<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">TOOLKIT</span>
              </h2>
              <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xs">
                Unlock strategic excellence through our comprehensive GCC assessment framework.
              </p>
            </div>
          </div>
          
          <div className="relative z-10 pt-12">
            <div className="flex items-center gap-4 text-white/40">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center">
                    <i className="fa-solid fa-user-check text-[10px]"></i>
                  </div>
                ))}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest">Consultant Verified</span>
            </div>
          </div>
        </div>

        {/* Right Side: Setup Form */}
        <div className="p-16 flex flex-col justify-center">
          <div className="mb-10">
            <span className="text-[9px] font-black text-red-600 uppercase tracking-[0.3em] block mb-2">Phase 01: Initiation</span>
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">Setup Assessment</h3>
          </div>

          <div className="space-y-8">
            <div className="space-y-2.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block ml-1">Engagement Lead</label>
              <div className="relative group">
                <i className="fa-solid fa-user-tie absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-red-500 transition-colors"></i>
                <input 
                  type="text" 
                  placeholder="Lead Consultant Name"
                  value={clientInfo.userName}
                  onChange={(e) => setClientInfo(prev => ({ ...prev, userName: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-14 pr-6 py-5 text-sm font-bold text-slate-800 outline-none transition-premium focus:ring-4 focus:ring-red-50/50 focus:border-red-200 placeholder:text-slate-300"
                />
              </div>
            </div>

            <div className="space-y-2.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block ml-1">Client Organization</label>
              <div className="relative group">
                <i className="fa-solid fa-building absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-red-500 transition-colors"></i>
                <input 
                  type="text" 
                  placeholder="Target Enterprise Name"
                  value={clientInfo.companyName}
                  onChange={(e) => setClientInfo(prev => ({ ...prev, companyName: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-14 pr-6 py-5 text-sm font-bold text-slate-800 outline-none transition-premium focus:ring-4 focus:ring-red-50/50 focus:border-red-200 placeholder:text-slate-300"
                />
              </div>
            </div>

            <button 
              onClick={onContinue}
              disabled={!clientInfo.userName || !clientInfo.companyName}
              className="w-full bg-red-600 text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-red-100 hover:bg-red-700 transition-premium active:scale-95 disabled:opacity-20 mt-4 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                Begin Analysis <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </div>

          <div className="mt-12 flex items-center justify-between opacity-40 grayscale">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-shield-halved text-[9px]"></i>
              <span className="text-[8px] font-bold uppercase tracking-widest">Enterprise Secured</span>
            </div>
            <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-cloud-bolt text-[9px]"></i>
              <span className="text-[8px] font-bold uppercase tracking-widest">Session Sync</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupTab;
