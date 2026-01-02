
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { METHOD_GRID } from '../constants';

/**
 * Using jsDelivr CDN for reliable CORS support.
 * jsDelivr is optimized for serving GitHub assets with correct headers.
 */
const BELL_URLS: Record<number, string> = {
  1: 'https://cdn.jsdelivr.net/gh/RingingRoom/ringingroom@master/ringingroom/static/audio/1.wav',
  2: 'https://cdn.jsdelivr.net/gh/RingingRoom/ringingroom@master/ringingroom/static/audio/2.wav',
  3: 'https://cdn.jsdelivr.net/gh/RingingRoom/ringingroom@master/ringingroom/static/audio/3.wav',
  4: 'https://cdn.jsdelivr.net/gh/RingingRoom/ringingroom@master/ringingroom/static/audio/4.wav',
  5: 'https://cdn.jsdelivr.net/gh/RingingRoom/ringingroom@master/ringingroom/static/audio/5.wav',
  6: 'https://cdn.jsdelivr.net/gh/RingingRoom/ringingroom@master/ringingroom/static/audio/6.wav',
};

const Simulator: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [userBell, setUserBell] = useState(2);
  const [currentRowIdx, setCurrentRowIdx] = useState(0);
  const [currentBlowIdx, setCurrentBlowIdx] = useState(-1);
  const [score, setScore] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [feedback, setFeedback] = useState<{ text: string, type: 'good' | 'bad' | 'neutral' } | null>(null);
  const [tempo, setTempo] = useState(600);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  
  const [isHandstroke, setIsHandstroke] = useState(true);

  const timerRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const bellBuffersRef = useRef<Record<number, AudioBuffer>>({});

  /**
   * Initialize Audio Engine and Load Real Samples
   */
  const initAudioAndLoadBells = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setLoadError(null);
    
    try {
      // 1. Create or Resume AudioContext
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({
          sampleRate: 44100
        });
      }
      
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      // 2. Fetch and Decode Buffers with explicit CORS mode
      const loadTasks = Object.entries(BELL_URLS).map(async ([num, url]) => {
        const response = await fetch(url, { mode: 'cors' });
        if (!response.ok) throw new Error(`HTTP ${response.status} fetching bell ${num}`);
        
        const arrayBuffer = await response.arrayBuffer();
        // Use the newer promise-based decodeAudioData
        const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
        bellBuffersRef.current[parseInt(num)] = audioBuffer;
      });

      await Promise.all(loadTasks);
      setIsLoaded(true);
      setIsLoading(false);
      console.log("Belfry successfully initialized with real audio samples.");
    } catch (err) {
      console.error("Critical Audio Load Error:", err);
      setLoadError("Failed to load real bell sounds. This is usually due to network restrictions. Falling back to digital tones.");
      setIsLoaded(true); // Allow proceeding with fallback tones
      setIsLoading(false);
    }
  };

  /**
   * High-Precision Audio Playback
   */
  const playBellSound = useCallback((pitch: number) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;

    if (bellBuffersRef.current[pitch]) {
      const source = ctx.createBufferSource();
      source.buffer = bellBuffersRef.current[pitch];
      
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.7, ctx.currentTime);
      // Natural decay for large church bells
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.0);
      
      source.connect(gain);
      gain.connect(ctx.destination);
      source.start(ctx.currentTime);
    } else {
      // Emergency Tone Synthesis (Fallback)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      // Approximate church bell pitches
      const freqs = [523.25, 493.88, 440.00, 392.00, 349.23, 261.63];
      osc.frequency.setValueAtTime(freqs[pitch - 1] || 440, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    }
  }, []);

  const handleStrike = useCallback(() => {
    if (!isPlaying) return;

    playBellSound(userBell);

    const row = METHOD_GRID[currentRowIdx];
    const fullRow = [...row, 6]; 
    const correctPlace = fullRow.indexOf(userBell);

    if (currentBlowIdx === correctPlace) {
      setScore(s => s + 1);
      setFeedback({ text: 'Perfect!', type: 'good' });
    } else {
      // Only penalize if we're not close
      setFeedback({ text: 'Miss-timed!', type: 'bad' });
    }
    setTotalAttempts(t => t + 1);
  }, [isPlaying, currentRowIdx, currentBlowIdx, userBell, playBellSound]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleStrike();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleStrike]);

  /**
   * Main Timing Loop
   */
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setCurrentBlowIdx(prev => {
          const next = prev + 1;
          
          if (next < 6) {
            const row = METHOD_GRID[currentRowIdx];
            const fullRow = [...row, 6];
            const bellToRing = fullRow[next];
            
            // Auto-strike if it's not the user's bell
            if (bellToRing !== userBell) {
              playBellSound(bellToRing);
            }
            return next;
          } else {
            const nextRowIdx = (currentRowIdx + 1) % METHOD_GRID.length;
            setCurrentRowIdx(nextRowIdx);
            setIsHandstroke(nextRowIdx % 2 === 0);
            return 0;
          }
        });
      }, tempo);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentRowIdx, userBell, tempo, playBellSound]);

  const togglePlay = () => {
    if (!isPlaying) {
      setCurrentRowIdx(0);
      setCurrentBlowIdx(-1);
      setIsHandstroke(true);
      setScore(0);
      setTotalAttempts(0);
      setFeedback(null);
    }
    setIsPlaying(!isPlaying);
  };

  const accuracy = totalAttempts > 0 ? Math.round((score / totalAttempts) * 100) : 0;

  if (!isLoaded) {
    return (
      <div className="bg-slate-900 rounded-3xl p-12 text-center text-white min-h-[450px] flex flex-col items-center justify-center border border-slate-800 shadow-2xl">
        <div className="w-24 h-24 bg-blue-600/10 rounded-full flex items-center justify-center mb-8 border border-blue-500/20">
            <span className="text-6xl animate-pulse">⛪</span>
        </div>
        <h3 className="text-3xl font-bold font-serif mb-4">Tower Preparation</h3>
        <p className="text-slate-400 max-w-sm mx-auto mb-8 leading-relaxed">
          Browser security requires a manual gesture to initialize the church bell audio engine.
        </p>
        
        {loadError && (
          <div className="bg-amber-500/10 border border-amber-500/30 text-amber-400 px-4 py-3 rounded-xl mb-6 text-[10px] max-w-xs text-left">
            <strong>Notice:</strong> {loadError}
          </div>
        )}

        <button 
          onClick={initAudioAndLoadBells}
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-2xl font-black text-xl shadow-xl shadow-blue-900/40 transition-all flex items-center gap-4 disabled:opacity-50 group"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Entering Belfry...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
              Wake Up Belfry
            </>
          )}
        </button>
      </div>
    );
  }

  const currentRow = [...METHOD_GRID[currentRowIdx], 6];

  return (
    <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl border border-slate-800 overflow-hidden relative">
      <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
         <svg width="240" height="240" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C10.34 2 9 3.34 9 5V6H7C5.9 6 5 6.9 5 8V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V8C19 6.9 18.1 6 17 6H15V5C15 3.34 13.66 2 12 2M12 4C12.55 4 13 4.45 13 5V6H11V5C11 4.45 11.45 4 12 4M7 8H17V19H7V8M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"/></svg>
      </div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h2 className="text-4xl font-bold mb-2 font-serif tracking-tight">Tower Simulator</h2>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${isHandstroke ? 'bg-amber-500/20 text-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.2)]' : 'bg-indigo-500/20 text-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.2)]'}`}>
                {isHandstroke ? 'Handstroke' : 'Backstroke'}
              </span>
              <p className="text-slate-400 text-sm">Follow the ropes. Press <kbd className="bg-slate-800 px-2 py-1 rounded text-xs border border-slate-700">SPACE</kbd> to strike.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-2xl border border-slate-700 backdrop-blur-sm">
            <div className="text-center px-4 border-r border-slate-700">
              <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Accuracy</div>
              <div className={`text-3xl font-black ${accuracy > 80 ? 'text-green-400' : 'text-blue-400'}`}>{accuracy}%</div>
            </div>
            <div className="text-center px-4">
              <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Strikes</div>
              <div className="text-3xl font-black text-white">{score}</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8 mb-10">
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Practice Your Bell</label>
              <div className="grid grid-cols-2 gap-3">
                {[2, 3, 4, 5].map(b => (
                  <button
                    key={b}
                    onClick={() => setUserBell(b)}
                    disabled={isPlaying}
                    className={`h-14 rounded-xl font-black text-lg transition-all border-2 ${
                      userBell === b 
                      ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-900/40 translate-y-[-2px]' 
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white disabled:opacity-50'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Ringing Tempo</label>
              <input 
                type="range" 
                min="350" 
                max="900" 
                step="50"
                value={tempo}
                onChange={(e) => setTempo(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between mt-3 text-[10px] font-black text-slate-600 uppercase tracking-widest">
                <span>Fast</span>
                <span>Slow</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 bg-black/40 rounded-3xl p-8 border border-slate-800 flex flex-col items-center justify-between min-h-[450px] shadow-inner relative overflow-hidden">
             {isPlaying ? (
               <div className="w-full h-full flex flex-col justify-between">
                  <div className="flex justify-around items-start h-64 relative">
                    {currentRow.map((bellNum, placeIdx) => {
                      const isStriking = currentBlowIdx === placeIdx;
                      const isUser = bellNum === userBell;
                      const isTreble = bellNum === 1;
                      
                      return (
                        <div key={placeIdx} className="flex flex-col items-center h-full relative group">
                          <div className={`w-0.5 h-32 bg-slate-700 transition-all duration-300 ${isStriking ? 'translate-y-4' : ''}`}>
                             <div className={`absolute left-[-4px] bottom-4 w-2.5 h-12 rounded-full transition-all duration-300 ${
                               isUser ? 'bg-blue-500' : isTreble ? 'bg-red-500' : 'bg-amber-400'
                             } ${isStriking ? 'scale-125' : ''}`}></div>
                          </div>

                          <div className="mt-8 flex flex-col items-center">
                            <div 
                              className={`w-12 h-14 rounded-t-full transition-all duration-200 transform origin-top ${
                                isStriking ? (isHandstroke ? 'rotate-[-30deg]' : 'rotate-[30deg]') : 'rotate-0'
                              } ${
                                isUser ? 'bg-blue-600 shadow-[0_0_30px_rgba(59,130,246,0.4)]' : 
                                isTreble ? 'bg-red-600' : 'bg-slate-600'
                              }`}
                              style={{
                                clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)'
                              }}
                            >
                              <div className="w-full h-full flex items-center justify-center">
                                 <span className="text-white text-[10px] font-black">{bellNum === 6 ? 'T' : bellNum}</span>
                              </div>
                            </div>
                            <div className="w-14 h-1.5 bg-slate-800 rounded-full -mt-0.5"></div>
                          </div>
                          
                          <div className={`mt-auto text-[10px] font-black transition-colors ${isStriking ? 'text-white scale-150' : 'text-slate-700'}`}>
                             PLACE {placeIdx + 1}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="h-14 flex items-center justify-center">
                      {feedback && (
                        <div className={`text-2xl font-black tracking-tighter animate-bounce px-6 py-2 rounded-2xl ${
                          feedback.type === 'good' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                        }`}>
                          {feedback.text}
                        </div>
                      )}
                    </div>

                    <div className="bg-slate-900/80 px-10 py-4 rounded-2xl border border-slate-800 backdrop-blur-md shadow-2xl">
                      <div className="flex items-center gap-6 font-mono text-3xl tracking-[1em] text-center">
                        {currentRow.map((b, idx) => (
                          <span key={idx} className={`transition-all duration-150 ${
                            b === userBell ? 'text-blue-500 font-black scale-125' : 
                            currentBlowIdx === idx ? 'text-white' : 'text-slate-700'
                          }`}>
                            {b === 6 ? '6' : b}
                          </span>
                        ))}
                      </div>
                      <div className="mt-2 text-[10px] text-center font-black text-slate-500 uppercase tracking-widest">
                        Current Row Striking Order
                      </div>
                    </div>
                  </div>
               </div>
             ) : (
               <div className="text-center space-y-6">
                 <div className="w-24 h-24 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto border border-blue-500/20">
                    <span className="text-5xl animate-pulse">🔔</span>
                 </div>
                 <div>
                   <h3 className="text-2xl font-serif font-bold text-white mb-2">Belfry Ready</h3>
                   <p className="text-slate-500 text-sm max-w-xs mx-auto leading-relaxed">
                     Practice striking your bell in the sequence. Remember: <strong>Handstroke</strong> has an open lead after the tenor.
                   </p>
                 </div>
                 <div className="flex justify-center gap-4 pt-4">
                    <div className="flex items-center gap-2 text-[10px] font-black text-blue-400 uppercase tracking-widest">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div> You (Bell {userBell})
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-red-400 uppercase tracking-widest">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div> Treble
                    </div>
                 </div>
               </div>
             )}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={togglePlay}
            className={`flex-1 py-5 rounded-2xl font-black text-xl transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95 ${
              isPlaying 
              ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700' 
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/40 border-b-4 border-blue-800'
            }`}
          >
            {isPlaying ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Abandon Course
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Look To...
              </>
            )}
          </button>
          
          <button
            onClick={handleStrike}
            disabled={!isPlaying}
            className={`flex-[2] py-5 rounded-2xl font-black text-2xl transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-[0.97] border-b-4 ${
              isPlaying 
              ? 'bg-white text-slate-900 border-slate-300 hover:bg-slate-50' 
              : 'bg-slate-800 text-slate-600 border-slate-900 cursor-not-allowed'
            }`}
          >
            STRIKE!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
