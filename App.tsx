
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
        
        {/* Core Principles Section */}
        <section id="principles" className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-10 -mt-10 pointer-events-none"></div>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <span className="text-blue-600">01.</span> The Core Principles
            </h2>
            <div className="space-y-6 text-slate-700 leading-relaxed">
              <p className="text-lg">
                Plain Bob Doubles can be understood with these simple observations:
              </p>
              <ul className="space-y-4">
                <li className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p><strong className="text-slate-900">The treble always plain hunts</strong> – This makes it a reliable reference point throughout the method.</p>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p><strong className="text-slate-900">There are four working bells</strong> (2, 3, 4, and 5) that change their positions.</p>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p><strong className="text-slate-900">These bells plain hunt</strong> – except when the treble makes its backstroke lead.</p>
                </li>
              </ul>
              
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mt-8">
                <p className="font-bold text-slate-900 mb-4 uppercase tracking-wider text-sm">At the treble's backstroke lead:</p>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 text-center">
                    <div className="text-2xl mb-1">🥇</div>
                    <div className="font-bold text-blue-600">Make 2nds</div>
                    <div className="text-xs text-slate-500">One bell</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 text-center">
                    <div className="text-2xl mb-1">📏</div>
                    <div className="font-bold text-blue-600">Long 5ths</div>
                    <div className="text-xs text-slate-500">One bell (4 blows)</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 text-center">
                    <div className="text-2xl mb-1">🔄</div>
                    <div className="font-bold text-blue-600">Dodge 3-4</div>
                    <div className="text-xs text-slate-500">Two bells</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Passing the Treble Section */}
        <section id="signposts" className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 border border-slate-100">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-3 font-serif">
              <span className="text-blue-600">02.</span> Passing the Treble
            </h2>
            <p className="text-slate-600 mb-10 leading-relaxed text-lg italic">
              Where you strike relative to the Treble tells you what your next piece of work will be.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-md transition-all">
                <div className="text-xs font-black text-blue-500 uppercase tracking-widest mb-2">Rule 1</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Go 2nds over the treble</h3>
                <div className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg inline-block uppercase tracking-wider">ACTION: MAKE 2NDS</div>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-md transition-all">
                <div className="text-xs font-black text-blue-500 uppercase tracking-widest mb-2">Rule 2</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Go 3rds over the treble</h3>
                <div className="bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg inline-block uppercase tracking-wider">ACTION: DODGE 3-4 UP</div>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-md transition-all">
                <div className="text-xs font-black text-blue-500 uppercase tracking-widest mb-2">Rule 3</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Go 4ths over the treble</h3>
                <div className="bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg inline-block uppercase tracking-wider">ACTION: FOUR BLOWS BEHIND</div>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-md transition-all">
                <div className="text-xs font-black text-blue-500 uppercase tracking-widest mb-2">Rule 4</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Go 5ths over the treble</h3>
                <div className="bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg inline-block uppercase tracking-wider">ACTION: DODGE 3-4 DOWN</div>
              </div>
            </div>
          </div>
        </section>

        {/* Speed and Rope Handling Section */}
        <section id="technique" className="max-w-4xl mx-auto">
          <div className="bg-slate-900 text-white rounded-3xl shadow-2xl p-8 lg:p-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <span className="text-blue-500">03.</span> Speed & Rope Handling
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all">
                  <h3 className="text-xl font-bold text-blue-400 mb-3 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Hunting Up (Slower)
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    As you move from the front towards the 5th place, you need to ring <span className="text-white font-bold">slower</span>.
                  </p>
                  <ul className="text-xs space-y-2 text-slate-300">
                    <li className="flex gap-2"><span>•</span> <span><strong>The Backstroke:</strong> Slide your hands <strong>up</strong> the tail end. Catching it higher lets the bell swing further.</span></li>
                    <li className="flex gap-2"><span>•</span> <span><strong>The Sally:</strong> Let the sally go a little higher before catching it.</span></li>
                  </ul>
                </div>

                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all">
                  <h3 className="text-xl font-bold text-indigo-400 mb-3 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Hunting Down (Faster)
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    As you move from the back towards the lead, you need to ring <span className="text-white font-bold">faster</span>.
                  </p>
                  <ul className="text-xs space-y-2 text-slate-300">
                    <li className="flex gap-2"><span>•</span> <span><strong>The Backstroke:</strong> Slide your hands <strong>down</strong> the tail end. Catching it lower checks the bell's rise.</span></li>
                    <li className="flex gap-2"><span>•</span> <span><strong>The Sally:</strong> Pull the sally down a fraction sooner to bring the bell back down.</span></li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-600/10 p-8 rounded-3xl border border-blue-500/20">
                <h3 className="text-lg font-bold mb-4 uppercase tracking-widest text-blue-300">Rhythm: Bells In Between</h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  In rounds on 6 bells (Doubles + Tenor), there are always <span className="text-white font-bold">5 bells</span> between your own strikes. When you hunt, you change this gap:
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center font-bold text-blue-400 shrink-0 italic">S</div>
                    <div>
                      <div className="text-sm font-bold">Slower (Hunting Up)</div>
                      <div className="text-xs text-slate-400">Put <span className="text-white">6 bells</span> in between. You are "widening" the gap.</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center font-bold text-indigo-400 shrink-0 italic">F</div>
                    <div>
                      <div className="text-sm font-bold">Faster (Hunting Down)</div>
                      <div className="text-xs text-slate-400">Put <span className="text-white">4 bells</span> in between. You are "narrowing" the gap.</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center font-bold text-slate-400 shrink-0 italic">R</div>
                    <div>
                      <div className="text-sm font-bold">Rounds / Stationary</div>
                      <div className="text-xs text-slate-400">Back to the standard <span className="text-white">5 bells</span> in between.</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/5 italic text-xs text-slate-400">
                  Tip: Use your "rope-sight" to see who you are following. When hunting up, you follow someone who rings later than your previous lead.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blue Line Section */}
        <section className="flex justify-center">
          <div className="w-full max-w-xl">
            <BlueLine />
          </div>
        </section>

        {/* Piece of Work Section */}
        <section id="work">
          <WorkExplanation />
        </section>

        {/* Ringing Simulator Section */}
        <section id="simulator">
          <Simulator />
        </section>

        {/* Glossary Section */}
        <section id="glossary">
          <Glossary />
        </section>

        {/* Quiz Section */}
        <section id="quiz">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-4">Are You Ready to Ring?</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Take our interactive quiz to see how well you've mastered the theory of Plain Bob Doubles.</p>
          </div>
          <Quiz />
        </section>

        {/* AI Tutor Section */}
        <section id="tutor" className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-4">Need Extra Help?</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Our AI Tower Tutor is available 24/7 to answer your specific questions about method ringing and theory.</p>
          </div>
          <Tutor />
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
