
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { METHOD_GRID } from '../constants';

const BELL_URLS: Record<number, string> = {
  1: 'https://cdn.jsdelivr.net/gh/lelandpaul/ringingroom@development/app/static/audio/raw_audio/tower/d1.wav',
  2: 'https://cdn.jsdelivr.net/gh/lelandpaul/ringingroom@development/app/static/audio/raw_audio/tower/d2.wav',
  3: 'https://cdn.jsdelivr.net/gh/lelandpaul/ringingroom@development/app/static/audio/raw_audio/tower/d3.wav',
  4: 'https://cdn.jsdelivr.net/gh/lelandpaul/ringingroom@development/app/static/audio/raw_audio/tower/d4.wav',
  5: 'https://cdn.jsdelivr.net/gh/lelandpaul/ringingroom@development/app/static/audio/raw_audio/tower/d5.wav',
  6: 'https://cdn.jsdelivr.net/gh/lelandpaul/ringingroom@development/app/static/audio/raw_audio/tower/d6.wav',
};

const Simulator: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [userBell, setUserBell] = useState(2);
  const [currentRowIdx, setCurrentRowIdx] = useState(1);
  const [currentBlowIdx, setCurrentBlowIdx] = useState(-1);
  const [score, setScore] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [lastStrikeScore, setLastStrikeScore] = useState<number | null>(null);
  const [timingOffset, setTimingOffset] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ text: string, type: 'good' | 'bad' | 'neutral' } | null>(null);
  const [tempo, setTempo] = useState(330);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  
  const [isHandstroke, setIsHandstroke] = useState(true);
  const [roundsCompleted, setRoundsCompleted] = useState(0);
  const [showGoCommand, setShowGoCommand] = useState(false);
  const [showCourseComplete, setShowCourseComplete] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);
  const [finishingRowsRung, setFinishingRowsRung] = useState(0);

  const timerRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const bellBuffersRef = useRef<Record<number, AudioBuffer>>({});
  
  const rowStartTimeRef = useRef<number>(0);
  const userBellRef = useRef(userBell);
  const tempoRef = useRef(tempo);
  const roundsCompletedRef = useRef(roundsCompleted);
  const currentRowIdxRef = useRef(1);
  const isHandstrokeRef = useRef(true);
  const isFinishingRef = useRef(false);
  const finishingRowsRungRef = useRef(0);

  useEffect(() => { userBellRef.current = userBell; }, [userBell]);
  useEffect(() => { tempoRef.current = tempo; }, [tempo]);
  useEffect(() => { roundsCompletedRef.current = roundsCompleted; }, [roundsCompleted]);
  useEffect(() => { currentRowIdxRef.current = currentRowIdx; }, [currentRowIdx]);
  useEffect(() => { isHandstrokeRef.current = isHandstroke; }, [isHandstroke]);
  useEffect(() => { isFinishingRef.current = isFinishing; }, [isFinishing]);
  useEffect(() => { finishingRowsRungRef.current = finishingRowsRung; }, [finishingRowsRung]);

  const speakCommand = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.1;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const initAudioAndLoadBells = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setLoadError(null);
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 44100 });
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') await ctx.resume();
      const loadTasks = Object.entries(BELL_URLS).map(async ([num, url]) => {
        const response = await fetch(url, { mode: 'cors' });
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
        bellBuffersRef.current[parseInt(num)] = audioBuffer;
      });
      await Promise.all(loadTasks);
      setIsLoaded(true);
      setIsLoading(false);
    } catch (err) {
      setLoadError("Audio error.");
      setIsLoaded(true); 
      setIsLoading(false);
    }
  };

  const playBellSound = useCallback((pitch: number) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    if (bellBuffersRef.current[pitch]) {
      const source = ctx.createBufferSource();
      source.buffer = bellBuffersRef.current[pitch];
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.8, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.0);
      source.connect(gain);
      gain.connect(ctx.destination);
      source.start(ctx.currentTime);
    }
  }, []);

  const handleStrike = useCallback(() => {
    if (!isPlaying) return;
    const currentTime = performance.now();
    playBellSound(userBellRef.current);

    let rowData;
    if (roundsCompletedRef.current < 6 || isFinishingRef.current) {
      rowData = [1, 2, 3, 4, 5, 6];
    } else {
      rowData = [...METHOD_GRID[currentRowIdxRef.current], 6]; 
    }
    
    const targetPlace = rowData.indexOf(userBellRef.current);
    const idealStrikeTime = rowStartTimeRef.current + (targetPlace * tempoRef.current);
    const diff = currentTime - idealStrikeTime;

    let currentScore = 0;
    const absDiff = Math.abs(diff);

    if (absDiff < 45) currentScore = 5;
    else if (absDiff < 85) currentScore = 4;
    else if (absDiff < 140) currentScore = 3;
    else if (absDiff < 210) currentScore = 2;
    else if (absDiff < 300) currentScore = 1;

    setLastStrikeScore(currentScore);
    setTimingOffset(diff);
    setScore(s => s + currentScore);
    setTotalAttempts(t => t + 1);

    if (currentScore >= 4) setFeedback({ text: currentScore === 5 ? 'Perfect!' : 'Great!', type: 'good' });
    else if (currentScore >= 2) setFeedback({ text: 'Tidy', type: 'neutral' });
    else setFeedback({ text: 'Wide!', type: 'bad' });
  }, [isPlaying, playBellSound]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        // Prevent strike if user is typing in an input or textarea
        const target = e.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
          return;
        }
        e.preventDefault();
        handleStrike();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleStrike]);

  useEffect(() => {
    if (isPlaying) {
      const runCycle = () => {
        setCurrentBlowIdx(prev => {
          let next = prev + 1;
          const totalBlowsInThisRow = isHandstrokeRef.current ? 6 : 7; 

          if (next >= totalBlowsInThisRow) {
            next = 0; 
            rowStartTimeRef.current = performance.now();

            if (isFinishingRef.current) {
              const rCount = finishingRowsRungRef.current + 1;
              setFinishingRowsRung(rCount);
              finishingRowsRungRef.current = rCount;
              if (rCount >= 4) {
                speakCommand("Stand");
                setIsPlaying(false);
                return -1;
              }
            } else if (roundsCompletedRef.current < 6) {
              const nextRoundCount = roundsCompletedRef.current + 1;
              setRoundsCompleted(nextRoundCount);
              roundsCompletedRef.current = nextRoundCount;
              
              if (nextRoundCount === 6) {
                 setCurrentRowIdx(1);
                 currentRowIdxRef.current = 1;
                 setShowGoCommand(true);
                 speakCommand("Go Plain Bob Doubles");
                 setTimeout(() => setShowGoCommand(false), 2000);
              }
            } else {
              if (currentRowIdxRef.current >= METHOD_GRID.length - 1) {
                setIsFinishing(true);
                isFinishingRef.current = true;
                setFinishingRowsRung(0);
                finishingRowsRungRef.current = 0;
                setShowCourseComplete(true);
                speakCommand("That's all");
                setTimeout(() => setShowCourseComplete(false), 3000);
              } else {
                const nextRowIdx = currentRowIdxRef.current + 1;
                setCurrentRowIdx(nextRowIdx);
                currentRowIdxRef.current = nextRowIdx;
              }
            }

            const nextStrokeStatus = !isHandstrokeRef.current;
            setIsHandstroke(nextStrokeStatus);
            isHandstrokeRef.current = nextStrokeStatus;
          }

          let rowData;
          if (roundsCompletedRef.current < 6 || isFinishingRef.current) {
            rowData = [1, 2, 3, 4, 5, 6];
          } else {
            rowData = [...METHOD_GRID[currentRowIdxRef.current], 6];
          }

          if (next < 6) {
            const bellToRing = rowData[next];
            if (bellToRing !== userBellRef.current) {
              playBellSound(bellToRing);
            }
          }
          return next;
        });
      };
      rowStartTimeRef.current = performance.now();
      timerRef.current = window.setInterval(runCycle, tempoRef.current);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPlaying, playBellSound]);

  const togglePlay = () => {
    if (!isPlaying) {
      setCurrentRowIdx(1); 
      currentRowIdxRef.current = 1;
      setCurrentBlowIdx(-1);
      setIsHandstroke(true);
      isHandstrokeRef.current = true;
      setScore(0);
      setTotalAttempts(0);
      setFeedback(null);
      setLastStrikeScore(null);
      setTimingOffset(null);
      setRoundsCompleted(0);
      roundsCompletedRef.current = 0;
      setShowGoCommand(false);
      setShowCourseComplete(false);
      setIsFinishing(false);
      isFinishingRef.current = false;
      setFinishingRowsRung(0);
      finishingRowsRungRef.current = 0;
    }
    setIsPlaying(!isPlaying);
  };

  const avgScore = totalAttempts > 0 ? (score / totalAttempts).toFixed(1) : "0.0";

  if (!isLoaded) {
    return (
      <div className="bg-slate-900 rounded-3xl p-12 text-center text-white min-h-[450px] flex flex-col items-center justify-center border border-slate-800 shadow-2xl">
        <div className="w-24 h-24 bg-blue-600/10 rounded-full flex items-center justify-center mb-8 border border-blue-500/20">
            <span className="text-6xl animate-pulse">⛪</span>
        </div>
        <h3 className="text-3xl font-bold font-serif mb-4">Tower Preparation</h3>
        <button onClick={initAudioAndLoadBells} disabled={isLoading} className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-2xl font-black text-xl shadow-xl transition-all">
          {isLoading ? "Preparing the Belfry..." : "Enter Belfry"}
        </button>
      </div>
    );
  }

  const currentViewRow = (roundsCompleted < 6 || isFinishing) ? [1, 2, 3, 4, 5, 6] : [...METHOD_GRID[currentRowIdx], 6];

  return (
    <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl border border-slate-800 overflow-hidden relative">
      {showGoCommand && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-blue-600/40 backdrop-blur-sm animate-in fade-in zoom-in duration-300">
          <div className="bg-white text-blue-600 px-12 py-8 rounded-3xl shadow-2xl transform scale-125 border-4 border-blue-400">
            <h2 className="text-5xl font-black italic uppercase tracking-tighter">Go Plain Bob!</h2>
          </div>
        </div>
      )}
      {showCourseComplete && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-green-600/40 backdrop-blur-sm animate-in fade-in zoom-in duration-300">
          <div className="bg-white text-green-600 px-12 py-8 rounded-3xl shadow-2xl transform scale-125 border-4 border-green-400">
            <h2 className="text-5xl font-black italic uppercase tracking-tighter">That's All!</h2>
          </div>
        </div>
      )}

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h2 className="text-4xl font-bold mb-2 font-serif tracking-tight text-white">Ringing Simulator</h2>
            <div className="flex items-center gap-3">
              <span className={`px-5 py-2 rounded-full text-sm font-black uppercase tracking-widest border-2 transition-all duration-300 ${isHandstroke ? 'bg-amber-500 text-white border-white shadow-[0_0_20px_rgba(245,158,11,0.6)]' : 'bg-indigo-600 text-white border-white shadow-[0_0_20px_rgba(79,70,229,0.6)]'}`}>
                {isHandstroke ? 'Handstroke' : 'Backstroke'}
              </span>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">
                {isFinishing ? 'Rounds (Standing)' : roundsCompleted < 6 ? `Rounds (${roundsCompleted}/6)` : 'Method Performance'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-2xl border border-slate-700 backdrop-blur-sm">
            <div className="text-center px-4 border-r border-slate-700">
              <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Avg Score</div>
              <div className="text-3xl font-black text-blue-400">{avgScore}</div>
            </div>
            <div className="text-center px-4">
              <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Last Strike</div>
              <div className="text-3xl font-black text-white">{lastStrikeScore || '-'}</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8 mb-10">
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50 shadow-inner">
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4 text-center">Your Bell Position</label>
              <div className="grid grid-cols-2 gap-3">
                {[2, 3, 4, 5].map(b => (
                  <button key={b} onClick={() => setUserBell(b)} disabled={isPlaying} className={`h-14 rounded-xl font-black text-lg transition-all border-2 ${userBell === b ? 'bg-blue-600 border-blue-400 text-white shadow-lg -translate-y-1' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'}`}>
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50 shadow-inner">
              <div className="flex justify-between items-center mb-4">
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Tempo (ms)</label>
                <span className="text-xs font-black text-blue-400">{tempo}ms</span>
              </div>
              <input type="range" min="180" max="1000" step="10" value={tempo} onChange={(e) => setTempo(Number(e.target.value))} className="w-full h-2 bg-slate-900 rounded-lg accent-blue-500 appearance-none cursor-pointer" />
            </div>

            {timingOffset !== null && isPlaying && (
              <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50 text-center shadow-inner">
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Strike Precision</label>
                <div className="relative h-6 bg-slate-900 rounded-full border border-slate-700 overflow-hidden shadow-inner mb-2">
                   <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/20 z-10"></div>
                   <div 
                    className={`absolute top-0 bottom-0 transition-all duration-150 ${timingOffset > 0 ? 'bg-red-500' : 'bg-blue-500'} shadow-[0_0_15px_rgba(255,255,255,0.2)]`}
                    style={{ 
                      left: timingOffset > 0 ? '50%' : `${Math.max(0, 50 + (timingOffset / 4))}%`, 
                      right: timingOffset > 0 ? `${Math.max(0, 50 - (timingOffset / 4))}%` : '50%'
                    }}
                   ></div>
                </div>
                <div className="flex justify-between text-[9px] font-bold text-slate-600 uppercase tracking-widest">
                  <span>Early</span>
                  <span className="text-white font-mono">{Math.round(timingOffset)}ms</span>
                  <span>Late</span>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-3 bg-black/60 rounded-3xl p-8 border border-slate-800 flex flex-col items-center justify-between min-h-[520px] shadow-2xl relative overflow-hidden">
             {isPlaying ? (
               <div className="w-full h-full flex flex-col justify-between">
                  <div className="flex justify-around items-start h-80 relative overflow-visible">
                    {currentViewRow.map((bellNum, placeIdx) => {
                      const isStriking = currentBlowIdx === placeIdx;
                      const isUser = bellNum === userBell;
                      const isTreble = bellNum === 1;
                      const isTenor = bellNum === 6;
                      
                      return (
                        <div key={placeIdx} className="flex flex-col items-center h-full relative">
                          {/* Rope Visual */}
                          <div className={`w-1.5 h-64 bg-slate-800 relative transition-all duration-200 ${isStriking ? 'translate-y-8' : ''}`}>
                             
                             {/* Sally Visual: Realistically moves high up during Backstroke */}
                             <div 
                                className={`absolute left-1/2 -translate-x-1/2 w-5 h-22 bg-[repeating-linear-gradient(45deg,#ff0000,#ff0000_6px,#ffffff_6px,#ffffff_12px,#0000ff_12px,#0000ff_18px)] rounded-full border-2 border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.2)] z-30 transition-all duration-300 ${
                                    isHandstroke 
                                    ? 'top-20 opacity-100' 
                                    : '-top-10 opacity-20 scale-75'
                                } ${isHandstroke && isStriking ? 'scale-110 shadow-[0_0_30px_white]' : ''}`}
                             ></div>
                             
                             {/* Tail end of rope: Ringer pulls this during Backstroke */}
                             <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-4 h-12 rounded-full border-2 border-white/10 transition-all duration-300 ${
                                isUser ? 'bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.6)]' : 
                                isTreble ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 
                                isTenor ? 'bg-amber-500' : 'bg-slate-400'
                             } ${!isHandstroke && isStriking ? 'scale-125 shadow-[0_0_30px_white]' : ''}`}></div>
                          </div>
                          
                          {/* Bell Swing Visual */}
                          <div className="mt-8 flex flex-col items-center">
                            <div 
                              className={`w-18 h-20 rounded-t-full transition-all duration-300 transform origin-top ${
                                isStriking ? (isHandstroke ? 'rotate-[-45deg]' : 'rotate-[45deg]') : 'rotate-0'
                              } ${
                                isUser ? 'bg-blue-600 shadow-[0_0_50px_rgba(59,130,246,0.4)]' : 
                                isTreble ? 'bg-red-600 shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 
                                isTenor ? 'bg-amber-600 shadow-[0_0_20px_rgba(245,158,11,0.2)]' : 'bg-slate-600'
                              } border-2 border-white/20`}
                              style={{ clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)' }}
                            >
                              <div className="w-full h-full flex items-center justify-center">
                                <span className="text-white text-[13px] font-black">{bellNum}</span>
                              </div>
                            </div>
                            <div className="w-20 h-2.5 bg-slate-800 rounded-full -mt-0.5 border border-white/5 shadow-md"></div>
                          </div>
                          <div className={`mt-auto text-[11px] font-black tracking-tight transition-all duration-200 ${isStriking ? 'text-white scale-125' : 'text-slate-700'}`}>PLACE {placeIdx + 1}</div>
                        </div>
                      );
                    })}
                    
                    {/* Open Lead Gap Indicator (The "Handstroke Gap") */}
                    {!isHandstroke && (
                      <div className="flex flex-col items-center h-full relative opacity-50">
                         <div className={`w-2.5 bg-slate-900 transition-all duration-200 ${currentBlowIdx === 6 ? 'h-64 translate-y-6 opacity-100 bg-blue-500/40 shadow-[0_0_30px_rgba(59,130,246,0.5)]' : 'h-14 opacity-10'}`}></div>
                         <div className={`mt-auto text-[10px] font-black uppercase tracking-widest ${currentBlowIdx === 6 ? 'text-blue-400 scale-125' : 'text-slate-800'}`}>
                           {currentBlowIdx === 6 ? 'Handstroke Gap' : 'Lead'}
                         </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-center justify-center gap-6 mb-2">
                    <div className="h-24 flex items-center justify-center">
                      {feedback && (
                        <div className="flex flex-col items-center gap-2 animate-in slide-in-from-bottom duration-300">
                          <div className={`text-4xl font-black tracking-tighter ${feedback.type === 'good' ? 'text-green-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]' : feedback.type === 'bad' ? 'text-red-400' : 'text-amber-400'}`}>
                            {feedback.text}
                          </div>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map(star => (
                              <span key={star} className={`text-2xl transition-all duration-300 ${star <= (lastStrikeScore || 0) ? 'text-yellow-400 scale-125 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)]' : 'text-slate-800'}`}>★</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="bg-slate-900/95 px-16 py-7 rounded-[2rem] border border-slate-700 shadow-2xl backdrop-blur-xl">
                      <div className="flex items-center gap-14 font-mono text-5xl tracking-[0.5em] text-center">
                        {currentViewRow.map((b, idx) => (
                          <span key={idx} className={`transition-all duration-200 ${
                            b === userBell ? 'text-blue-500 font-black scale-150 drop-shadow-[0_0_20px_rgba(59,130,246,0.7)]' : 
                            currentBlowIdx === idx ? 'text-white' : 'text-slate-800'
                          }`}>
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
               </div>
             ) : (
               <div className="text-center space-y-12 py-16">
                 <div className="w-36 h-36 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto border border-blue-500/30 shadow-[0_0_60px_rgba(59,130,246,0.15)]">
                   <span className="text-8xl animate-bounce-slow text-white shadow-blue-500/50">🔔</span>
                 </div>
                 <div className="space-y-4">
                    <h3 className="text-4xl font-serif font-bold text-white tracking-tight">Rhythm & Technique</h3>
                    <p className="text-slate-400 text-lg max-w-sm mx-auto leading-relaxed">
                      Ring the method. Pull the <strong>Sally</strong> for Handstrokes and the <strong>Tail End</strong> for Backstrokes. Master the rhythm.
                    </p>
                 </div>
               </div>
             )}
          </div>
        </div>

        <div className="flex gap-6">
          <button 
            onClick={togglePlay} 
            className={`flex-1 py-7 rounded-2xl font-black text-2xl transition-all shadow-2xl active:scale-95 border-b-4 ${
              isPlaying 
              ? 'bg-slate-800 text-slate-400 border-slate-900 hover:bg-slate-700' 
              : 'bg-blue-600 text-white border-blue-800 hover:bg-blue-500 shadow-blue-900/40'
            }`}
          >
            {isPlaying ? 'Abandon Course' : 'Look To...'}
          </button>
          
          <button 
            onClick={handleStrike} 
            disabled={!isPlaying} 
            className={`flex-[2] py-7 rounded-2xl font-black text-3xl transition-all shadow-2xl active:scale-[0.98] border-b-4 ${
              isPlaying 
              ? 'bg-white text-slate-900 border-slate-300 hover:bg-slate-50 shadow-[0_10px_30px_rgba(255,255,255,0.2)]' 
              : 'bg-slate-800 text-slate-600 border-slate-900 cursor-not-allowed'
            }`}
          >
            STRIKE (SPACE)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
