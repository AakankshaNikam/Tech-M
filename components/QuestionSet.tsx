
import React, { useEffect, useMemo } from 'react';
import QuestionItem from './QuestionItem';
import { QuestionBank } from '../types';

interface QuestionSetProps {
  dimension: string;
  vertical: string;
  subVertical: string;
  questionBank: QuestionBank;
  responses: Record<string, number>;
  onUpdateResponse: (questionId: string, score: number) => void;
  onUpdateDimensionScore: (dim: string, score: number) => void;
  deletedQuestions: string[];
}

const QuestionSet: React.FC<QuestionSetProps> = ({ 
  dimension, 
  vertical, 
  subVertical, 
  questionBank, 
  responses,
  onUpdateResponse,
  onUpdateDimensionScore,
  deletedQuestions
}) => {
  const data = questionBank[dimension]?.[vertical];

  const activeTop3 = useMemo(() => 
    data?.top3.filter(q => !deletedQuestions.includes(q.id)) || [], 
  [data, deletedQuestions]);

  const activeSubQuestions = useMemo(() => 
    (subVertical && data?.subVerticals?.[subVertical]) 
      ? data.subVerticals[subVertical].filter(q => !deletedQuestions.includes(q.id)) 
      : [], 
  [data, subVertical, deletedQuestions]);

  const allActive = useMemo(() => [...activeSubQuestions, ...activeTop3], [activeTop3, activeSubQuestions]);

  // Aggregate and update parent dimension score whenever responses for this dimension change
  useEffect(() => {
    if (allActive.length === 0) {
      onUpdateDimensionScore(dimension, 0);
      return;
    }

    let total = 0;
    let count = 0;
    allActive.forEach(q => {
      // Use persisted response or default to 3
      total += responses[q.id] ?? 3;
      count++;
    });

    onUpdateDimensionScore(dimension, total / count);
  }, [responses, allActive, dimension, onUpdateDimensionScore]);

  if (!data) return (
    <div className="flex flex-col items-center justify-center py-20 text-slate-400">
      <i className="fa-solid fa-folder-open text-4xl mb-4 opacity-20"></i>
      <p className="italic">No configuration found for this dimension/vertical selection.</p>
    </div>
  );

  return (
    <div className="space-y-6 pb-20 max-w-4xl">
      <div className="space-y-6">
        {allActive.map((q, i) => (
          <QuestionItem 
            key={`q-${q.id}`}
            number={i + 1}
            question={q.text}
            score={responses[q.id] ?? 3} // Pass persisted score down
            onScoreChange={(s) => onUpdateResponse(q.id, s)} // Update global response state
          />
        ))}
        {allActive.length === 0 && (
          <p className="text-xs text-slate-400 italic py-4">No benchmark indicators active for this view.</p>
        )}
      </div>
    </div>
  );
};

export default QuestionSet;
