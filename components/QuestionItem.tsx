
import React from 'react';
import { VG_JUSTIFICATIONS } from '../constants';

interface QuestionItemProps {
  number: number;
  question: string;
  score: number;
  onScoreChange: (score: number) => void;
}

const QuestionItem: React.FC<QuestionItemProps> = ({ number, question, score, onScoreChange }) => {
  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-premium border border-slate-100 transition-premium shadow-premium-hover group relative">
      <div className="flex flex-col gap-8">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center text-[10px] font-black shadow-sm">
              {number.toString().padStart(2, '0')}
            </span>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Maturity Marker</span>
              <div className="h-0.5 w-6 bg-red-100 rounded-full mt-1.5"></div>
            </div>
          </div>
          <p className="text-slate-800 text-[18px] font-bold leading-relaxed tracking-tight max-w-4xl">
            {question}
          </p>
        </div>

        {/* Scoring Options UI - Horizontal Qualitative Selection */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 ml-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select current state capability:</span>
          </div>
          
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2 bg-slate-50 p-1.5 rounded-[1.5rem] border border-slate-100">
              {VG_JUSTIFICATIONS.map((j) => {
                const isSelected = score === j.level;
                // Remove "LEVEL X – " prefix from the title
                const cleanTitle = j.title.split(' – ')[1] || j.title;
                
                return (
                  <button
                    key={j.level}
                    onClick={() => onScoreChange(j.level)}
                    className={`relative flex flex-col items-center justify-center text-center p-4 rounded-[1.1rem] transition-all duration-300 outline-none min-h-[90px] group/option ${
                      isSelected 
                        ? 'bg-red-600 text-white shadow-lg shadow-red-100 scale-[1.02] z-10' 
                        : 'bg-transparent text-slate-400 hover:bg-white hover:text-slate-900 border border-transparent hover:border-slate-100'
                    }`}
                  >
                    <span className={`text-[9px] font-black uppercase tracking-tight leading-tight transition-colors ${
                      isSelected ? 'text-white' : 'text-slate-400 group-hover/option:text-slate-700'
                    }`}>
                      {cleanTitle}
                    </span>
                    
                    {isSelected && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm animate-in zoom-in duration-300">
                        <i className="fa-solid fa-check text-red-600 text-[8px]"></i>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionItem;
