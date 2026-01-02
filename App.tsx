
import React from 'react';
import BlueLine from './components/BlueLine';
import WorkExplanation from './components/WorkExplanation';
import Tutor from './components/Tutor';
import Glossary from './components/Glossary';
import Quiz from './components/Quiz';
import Simulator from './components/Simulator';

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="relative bg-slate-900 text-white pt-24 pb-48 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 bg-blue-600 rounded-full text-xs font-bold tracking-widest uppercase mb-6 shadow-lg animate-fade-in">
            Level 1: The Foundations
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Mastering <span className="text-blue-500">Plain Bob Doubles</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 leading-relaxed">
            The fundamental method for every bell ringer. Learn the blue line, conquer the circle of work, 
            and build the skills for a lifetime of change ringing.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="#simulator" className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-bold transition-all shadow-xl shadow-blue-500/20">Try the Simulator</a>
            <a href="#quiz" className="bg-slate-800 hover:bg-slate-700 px-8 py-3 rounded-xl font-bold transition-all">Test Your Knowledge</a>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 -mt-32 relative z-20 space-y-20 pb-20">
        {/* Visualizer & Tutor Section */}
        <section className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <BlueLine />
          </div>
          <div className="lg:col-span-8 flex flex-col justify-center">
             <Tutor />
          </div>
        </section>

        {/* Ringing Simulator Section */}
        <section id="simulator">
          <Simulator />
        </section>

        {/* Piece of Work Section */}
        <section id="work">
          <WorkExplanation />
        </section>

        {/* Glossary Section */}
        <section id="glossary">
          <Glossary />
        </section>

        {/* The Rules Section */}
        <section className="bg-blue-600 text-white rounded-2xl p-10 shadow-2xl overflow-hidden relative">
          <div className="absolute -right-20 -top-20 text-[200px] opacity-10 pointer-events-none select-none">🔔</div>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-6">The Golden Rule of Plain Bob</h2>
            <p className="text-xl leading-relaxed mb-6 opacity-90">
              When the <strong className="text-white">Treble leads</strong>, the method changes. 
              The bell that the treble has just "turned" (struck after) makes <strong className="text-white">Seconds Place</strong>.
            </p>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold shrink-0">1</div>
                <p className="text-slate-100">If you were hunting up and meet the Treble in 1st place, you dodge <strong>3-4 Down</strong>.</p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold shrink-0">2</div>
                <p className="text-slate-100">If you were hunting down and meet the Treble in 1st place, you dodge <strong>3-4 Up</strong>.</p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold shrink-0">3</div>
                <p className="text-slate-100">If you were at the back, you stay there for 4 blows: <strong>Long 5ths</strong>.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section id="quiz">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-4">Are You Ready to Ring?</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Take our interactive quiz to see how well you've mastered the theory of Plain Bob Doubles.</p>
          </div>
          <Quiz />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-500 py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="text-2xl font-bold text-white mb-4">🔔 Master Bob Doubles</div>
          <p className="text-sm max-w-md mx-auto mb-8">
            An educational tool combining traditional bell ringing wisdom with modern AI interaction.
          </p>
          <div className="border-t border-slate-800 pt-8 text-xs uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Change Ringing Learning Portal
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
