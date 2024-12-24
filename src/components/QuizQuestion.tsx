import React from 'react';
import { Question } from '../types';
import { TypingExplanation } from './TypingExplanation';

interface QuizQuestionProps {
  question: Question;
  userAnswer: number | null;
  onAnswer: (answer: number) => void;
  showExplanation: boolean;
  explanation?: string;
}

export function QuizQuestion({ 
  question, 
  userAnswer, 
  onAnswer, 
  showExplanation,
  explanation 
}: QuizQuestionProps) {
  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
      <div className="space-y-3">
        {question.choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => !showExplanation && onAnswer(index + 1)}
            className={`w-full p-4 text-left rounded-lg transition-colors ${
              userAnswer === null
                ? 'hover:bg-gray-100 bg-white'
                : userAnswer === index + 1
                ? question.answer === index + 1
                  ? 'bg-green-100'
                  : 'bg-red-100'
                : question.answer === index + 1
                ? 'bg-green-100'
                : 'bg-gray-50'
            } ${showExplanation ? 'cursor-default' : 'cursor-pointer'}`}
            disabled={showExplanation}
          >
            {index + 1}. {choice}
          </button>
        ))}
      </div>

      {showExplanation && explanation && (
        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
          <TypingExplanation text={explanation} />
        </div>
      )}
    </div>
  );
}