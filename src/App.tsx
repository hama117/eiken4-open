import React, { useState, useCallback } from 'react';
import { FileUpload } from './components/FileUpload';
import { QuizQuestion } from './components/QuizQuestion';
import { QuizResults } from './components/QuizResults';
import { APIKeySetup } from './components/APIKeySetup';
import { Question } from './types';
import { useQuizState } from './hooks/useQuizState';

const QUESTIONS_PER_SET = 10;

export function App() {
  const [apiKey, setApiKey] = useState<string>('');
  const {
    state,
    handleQuestionsLoaded,
    handleAnswer,
    handleNextQuestion,
    handleContinue,
    handleReset
  } = useQuizState(apiKey);

  const handleApiKeySubmit = useCallback((key: string) => {
    setApiKey(key);
  }, []);

  if (!apiKey) {
    return <APIKeySetup onKeySubmit={handleApiKeySubmit} />;
  }

  if (state.questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <FileUpload onQuestionsLoaded={handleQuestionsLoaded} />
      </div>
    );
  }

  if (state.quizCompleted) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <QuizResults
          score={state.score % QUESTIONS_PER_SET}
          totalQuestions={QUESTIONS_PER_SET}
          onContinue={handleContinue}
          onReset={() => {
            setApiKey(''); // APIキー入力画面に戻る
            handleReset();
          }}
        />
      </div>
    );
  }

  const currentQuestion = state.questions[state.currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6 mb-4">
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-semibold">
            問題 {(state.currentQuestionIndex % QUESTIONS_PER_SET) + 1}/{QUESTIONS_PER_SET}
          </span>
          <span className="text-lg">
            スコア: {state.score % QUESTIONS_PER_SET}/{QUESTIONS_PER_SET}
          </span>
        </div>

        <QuizQuestion
          question={currentQuestion}
          userAnswer={state.userAnswer}
          onAnswer={handleAnswer}
          showExplanation={state.showExplanation}
        />

        {state.showExplanation && (
          <div className="mt-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">解説:</h3>
              <p className="whitespace-pre-line">{state.explanation}</p>
            </div>
            <button
              onClick={handleNextQuestion}
              className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              次の問題へ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}