
import React, { useState } from 'react';

interface AdminLoginProps {
  onAuthenticated: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onAuthenticated }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (id === 'Tech Mahindra' && password === 'IIMUDAIPUR') {
      onAuthenticated();
    } else {
      setError('Invalid administrative credentials');
    }
  };

  return (
    <div className="max-w-md mx-auto py-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="bg-white rounded-[2.5rem] p-12 border border-slate-100 shadow-premium relative">
        <div className="absolute top-0 left-12 w-24 h-1.5 bg-slate-900 rounded-b-full"></div>
        
        <div className="mb-12 text-center">
          <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-900 mx-auto mb-6">
            <i className="fa-solid fa-shield-halved text-2xl"></i>
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">Admin Gateway</h3>
          <p className="text-xs font-medium text-slate-400 mt-2">Elevated privileges required for session orchestration</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-8">
          {error && (
            <div className="bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-wider p-4 rounded-xl border border-red-100 animate-pulse text-center">
              {error}
            </div>
          )}

          <div className="space-y-2.5">
            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block ml-1">Identity ID</label>
            <input 
              type="text" 
              placeholder="System ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-800 outline-none transition-premium focus:ring-4 focus:ring-slate-100 placeholder:text-slate-300"
            />
          </div>

          <div className="space-y-2.5">
            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block ml-1">Access Token</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-800 outline-none transition-premium focus:ring-4 focus:ring-slate-100 placeholder:text-slate-300"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-slate-900 text-white py-5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-slate-800 transition-premium active:scale-95 mt-4 group"
          >
            Authenticate <i className="fa-solid fa-key ml-2 group-hover:rotate-12 transition-transform"></i>
          </button>
        </form>

        <div className="mt-14 pt-8 border-t border-slate-50 flex items-center justify-center opacity-40">
          <span className="text-[8px] font-bold uppercase tracking-widest">Internal Use Only — Security Protocol 4.0</span>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
