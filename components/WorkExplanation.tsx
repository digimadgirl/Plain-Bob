
import React, { useState } from 'react';
import { WORK_STAGES } from '../constants';

const WorkExplanation: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 lg:p-10">
      <h2 className="text-3xl font-bold mb-6">The Circle of Work</h2>
      <p className="text-slate-600 mb-8 leading-relaxed">
        In Plain Bob Doubles, as you ring the method, you cycle through four distinct "pieces of work" 
        at the end of each lead (when the treble leads). Understanding these is key to "knowing the method."
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          {WORK_STAGES.map((stage, index) => (
            <button
              key={stage.name}
              onClick={() => setActiveStage(index)}
              className={`w-full text-left p-4 rounded-lg transition-all duration-200 border-2 ${
                activeStage === index 
                  ? 'border-blue-500 bg-blue-50 shadow-md' 
                  : 'border-slate-100 hover:border-blue-200 hover:bg-slate-50'
              }`}
            >
              <div className="font-bold text-lg">{stage.name}</div>
              <div className="text-sm text-slate-500">{stage.trigger}</div>
            </button>
          ))}
        </div>

        <div className="bg-slate-900 text-white rounded-xl p-8 flex flex-col justify-center min-h-[300px] relative overflow-hidden">
          <div className="absolute top-4 right-4 text-slate-700 font-black text-6xl select-none opacity-20">
            {activeStage + 1}
          </div>
          <h3 className="text-2xl font-bold mb-4 text-blue-400">{WORK_STAGES[activeStage].name}</h3>
          <p className="text-slate-300 mb-6 text-lg">
            {WORK_STAGES[activeStage].description}
          </p>
          <div className="p-4 bg-white/10 rounded-lg">
            <span className="text-blue-300 font-bold block mb-1">Visual Cue:</span>
            <span className="text-white italic">{WORK_STAGES[activeStage].visualCue}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkExplanation;
