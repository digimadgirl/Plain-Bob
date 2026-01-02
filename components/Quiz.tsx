
import React, { useState, useEffect } from 'react';
import { QUIZ_QUESTIONS } from '../constants';

const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Ensure internal state consistency if questions list changes (e.g. during dev/update)
  useEffect(() => {
    if (currentQuestion >= QUIZ_QUESTIONS.length) {
      setCurrentQuestion(0);
    }
  }, [QUIZ_QUESTIONS.length]);

  const handleOptionSelect = (index: number) => {
    if (showResult || isFinished) return;
    
    setSelectedOption(index);
    setShowResult(true);
    
    if (index === QUIZ_QUESTIONS[currentQuestion].correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setIsFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    const percentage = Math.round((score / QUIZ_QUESTIONS.length) * 100);
    return (
      <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-2xl mx-auto animate-fade-in border border-slate-100">
        <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner">
          {percentage >= 70 ? '🏆' : '📚'}
        </div>
        <h2 className="text-3xl font-bold mb-2">Quiz Results</h2>
        <div className="text-5xl font-black text-blue-600 mb-2">{percentage}%</div>
        <p className="text-slate-500 mb-8 font-medium">
          You got {score} out of {QUIZ_QUESTIONS.length} questions correct.
        </p>
        
        <div className="bg-slate-50 p-6 rounded-2xl mb-10 text-left border border-slate-100">
          <h4 className="font-bold text-slate-800 mb-2">Teacher's Note:</h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            {percentage === 100 
              ? "Flawless! You have a perfect theoretical understanding of Plain Bob Doubles. Time to grab a rope!" 
              : percentage >= 70
              ? "Well done! You have a strong grasp of the method rules. A little more review on the Circle of Work will make you unstoppable."
              : "A good start! Bell ringing theory takes time to sink in. Try reviewing the Blue Line diagram and the Circle of Work again."}
          </p>
        </div>
        
        <button 
          onClick={resetQuiz}
          className="w-full sm:w-auto bg-blue-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95"
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  const question = QUIZ_QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-3xl mx-auto border border-slate-100 flex flex-col">
      {/* Progress Bar */}
      <div className="h-2 w-full bg-slate-100">
        <div 
          className="h-full bg-blue-500 transition-all duration-500 ease-out" 
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="p-8 lg:p-12 flex-1">
        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Knowledge Check</span>
            <span className="text-sm font-bold text-slate-400">Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}</span>
          </div>
          <div className="px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-600">
            Score: {score}
          </div>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold mb-10 text-slate-800 leading-tight">
          {question.question}
        </h3>

        <div className="grid gap-3">
          {question.options.map((option, idx) => {
            let variant = "bg-white border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50/30";
            
            if (showResult) {
              if (idx === question.correctIndex) {
                variant = "bg-green-50 border-green-500 text-green-800 ring-2 ring-green-100";
              } else if (idx === selectedOption) {
                variant = "bg-red-50 border-red-500 text-red-800 ring-2 ring-red-100";
              } else {
                variant = "bg-white border-slate-100 text-slate-300 opacity-60";
              }
            }

            return (
              <button
                key={`${currentQuestion}-${idx}`}
                disabled={showResult}
                onClick={() => handleOptionSelect(idx)}
                className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 flex items-center gap-5 group ${variant}`}
              >
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-colors ${
                  showResult && idx === question.correctIndex ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="font-semibold text-base md:text-lg">{option}</span>
              </button>
            );
          })}
        </div>

        {showResult && (
          <div className="mt-10 animate-fade-in space-y-6">
            <div className={`p-6 rounded-2xl border flex gap-4 ${
              selectedOption === question.correctIndex ? 'bg-green-50/50 border-green-200' : 'bg-red-50/50 border-red-200'
            }`}>
              <div className="text-2xl pt-1">
                {selectedOption === question.correctIndex ? '✅' : '💡'}
              </div>
              <div>
                <div className={`font-bold text-lg mb-1 ${
                  selectedOption === question.correctIndex ? 'text-green-800' : 'text-red-800'
                }`}>
                  {selectedOption === question.correctIndex ? 'Correct!' : 'Learning Opportunity'}
                </div>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed font-medium">
                  {question.explanation}
                </p>
              </div>
            </div>
            
            <button 
              onClick={nextQuestion}
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2"
            >
              <span>{currentQuestion === QUIZ_QUESTIONS.length - 1 ? 'See Results' : 'Next Question'}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
