import React, { useEffect, useState } from 'react';

interface OmikujiRitualProps {
  onComplete: () => void;
}

export const OmikujiRitual: React.FC<OmikujiRitualProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'shaking' | 'reveal'>('shaking');

  useEffect(() => {
    // Shake for 3 seconds
    const shakeTimer = setTimeout(() => {
      setStage('reveal');
    }, 3000);

    // Complete after reveal animation
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 4500);

    return () => {
      clearTimeout(shakeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
      {stage === 'shaking' && (
        <div className="text-center">
          <div className="relative w-32 h-64 mx-auto animate-shake origin-bottom">
            {/* Hexagonal Box Body */}
            <div className="absolute inset-0 bg-shrine-wood border-4 border-shrine-dark rounded-lg flex items-center justify-center shadow-xl transform skew-x-1">
               <span className="text-shrine-gold font-serif font-bold text-2xl writing-vertical-rl opacity-80 border-2 border-shrine-gold p-1">
                 祈願
               </span>
            </div>
            {/* Lid */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-36 h-8 bg-shrine-dark rounded-sm"></div>
          </div>
          <p className="mt-8 text-shrine-wood font-serif text-xl animate-pulse">
            誠心祈求中...
          </p>
        </div>
      )}

      {stage === 'reveal' && (
        <div className="text-center animate-fade-in">
           {/* Stick emerging */}
           <div className="relative w-4 h-64 bg-yellow-100 mx-auto border border-yellow-200 shadow-lg flex items-end justify-center pb-4 rounded-full">
              <span className="text-red-600 font-bold writing-vertical-rl text-lg">
                神諭
              </span>
           </div>
           <p className="mt-8 text-shrine-red font-bold text-2xl font-serif">
             籤已落下
           </p>
        </div>
      )}
    </div>
  );
};
