import { useState } from 'react';
import { MbtiType, FortuneResult as FortuneResultType, UserInput } from './types';
import { fetchFortune } from './services/geminiService';
import { ToriiGate } from './components/ToriiGate';
import { OmikujiRitual } from './components/OmikujiRitual';
import { FortuneResult } from './components/FortuneResult';
import { ArrowRight, Sparkles } from 'lucide-react';

const MBTI_OPTIONS = Object.values(MbtiType);

export default function App() {
  const [appState, setAppState] = useState<'input' | 'ritual' | 'result'>('input');
  const [userInput, setUserInput] = useState<UserInput>({ mbti: '', question: '' });
  const [fortune, setFortune] = useState<FortuneResultType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStart = async () => {
    if (!userInput.mbti || !userInput.question.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setAppState('ritual'); // Start visual ritual immediately

    try {
      // Fetch fortune in background while animation plays
      const result = await fetchFortune(userInput.mbti as MbtiType, userInput.question);
      setFortune(result);
    } catch (err) {
      console.error(err);
      setError("MBTI小精靈此刻似乎很忙碌，請稍後再試。");
      setAppState('input'); // Go back on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleRitualComplete = () => {
    if (error) {
       setAppState('input');
    } else if (fortune) {
       setAppState('result');
    } else {
       // Fallback if API is slower than animation (unlikely with this flow but safe)
       // We stay in ritual state but show a 'Listening...' indicator logic could be added here
       // For now, let's assume fetch finishes within the 4.5s animation window or we wait
    }
  };

  const reset = () => {
    setAppState('input');
    setUserInput({ mbti: '', question: '' });
    setFortune(null);
    setError(null);
  };

  return (
    <div className="min-h-screen font-sans text-stone-800 bg-[#f5f5f4] selection:bg-shrine-red selection:text-white pb-10">
      {/* Background Decorative Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" 
           style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`}}>
      </div>

      <header className="pt-8 pb-4 text-center relative z-10">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-shrine-wood tracking-widest mb-2 flex items-center justify-center gap-2">
           <span className="text-shrine-red">⛩️</span> MBTI 神社
        </h1>
        <p className="text-stone-500 text-sm md:text-base font-serif">
          讓MBTI小精靈為你的性格指引迷津
        </p>
      </header>

      <main className="container mx-auto px-4 relative z-10 min-h-[600px] flex flex-col">
        
        {appState === 'input' && (
          <div className="max-w-md mx-auto w-full animate-fade-in mt-4">
            <ToriiGate />
            
            <div className="bg-white p-8 rounded-xl shadow-xl border-t-4 border-shrine-red">
              
              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm text-center">
                  {error}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 font-serif">
                    你的 MBTI 類型
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {MBTI_OPTIONS.map((type) => (
                      <button
                        key={type}
                        onClick={() => setUserInput({ ...userInput, mbti: type })}
                        className={`py-2 text-sm rounded-md transition-all font-medium border
                          ${userInput.mbti === type 
                            ? 'bg-shrine-red text-white border-shrine-red shadow-md transform scale-105' 
                            : 'bg-stone-50 text-gray-600 border-stone-200 hover:border-shrine-red/50 hover:bg-white'
                          }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 font-serif">
                    心中的疑惑
                  </label>
                  <textarea
                    value={userInput.question}
                    onChange={(e) => setUserInput({ ...userInput, question: e.target.value })}
                    placeholder="例如：我最近在職場上感到很迷惘，該不該換工作？"
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-shrine-red/50 focus:border-shrine-red outline-none bg-stone-50 min-h-[120px] resize-none transition-all placeholder:text-gray-400"
                  />
                </div>

                <button
                  onClick={handleStart}
                  disabled={!userInput.mbti || !userInput.question.trim()}
                  className="w-full py-4 bg-shrine-wood hover:bg-shrine-dark text-white rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                >
                  <Sparkles className="w-5 h-5 group-hover:animate-spin" />
                  誠心求籤
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
            
            <p className="text-center mt-8 text-xs text-stone-400">
               * MBTI小精靈會根據你的性格特質進行深度解析
            </p>
          </div>
        )}

        {appState === 'ritual' && (
          <div className="flex-1 flex flex-col items-center justify-center">
             <OmikujiRitual onComplete={handleRitualComplete} />
             {/* If API is slow, show loading text after animation finishes visually */}
             {isLoading && (
                 <p className="text-stone-400 text-sm mt-4 animate-pulse">
                     正在解讀星象與性格...
                 </p>
             )}
          </div>
        )}

        {appState === 'result' && fortune && (
          <FortuneResult result={fortune} onReset={reset} />
        )}

      </main>

      <footer className="fixed bottom-0 w-full py-4 text-center text-stone-400 text-xs bg-gradient-to-t from-[#f5f5f4] to-transparent pointer-events-none">
         MBTI Connected
      </footer>
    </div>
  );
}