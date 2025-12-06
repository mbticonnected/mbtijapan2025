import React, { useState } from 'react';
import { FortuneResult as FortuneResultType } from '../types';
import { Share2, RefreshCw } from 'lucide-react';

interface FortuneResultProps {
  result: FortuneResultType;
  onReset: () => void;
}

export const FortuneResult: React.FC<FortuneResultProps> = ({ result, onReset }) => {
  const [activeTab, setActiveTab] = useState<'love' | 'career' | 'family' | 'health'>('love');

  const getFortuneColor = (level: string) => {
    if (level.includes('大吉')) return 'text-red-600';
    if (level.includes('吉')) return 'text-orange-600';
    if (level.includes('凶')) return 'text-gray-600';
    return 'text-shrine-wood';
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in pb-12">
      {/* The Paper Strip (Omikuji) */}
      <div className="bg-shrine-paper border-2 border-shrine-red/30 p-8 shadow-2xl relative overflow-hidden">
        
        {/* Decorative corner stamps */}
        <div className="absolute top-0 right-0 p-2 opacity-20">
            <div className="w-16 h-16 border-4 border-shrine-red rounded-full flex items-center justify-center transform rotate-12">
                <span className="text-shrine-red font-bold font-serif">神籤</span>
            </div>
        </div>

        {/* Header: Fortune Level */}
        <div className="text-center mb-8 border-b-2 border-dashed border-gray-300 pb-6">
          <h2 className={`text-6xl font-serif font-bold mb-4 ${getFortuneColor(result.fortuneLevel)}`}>
            {result.fortuneLevel}
          </h2>
          <div className="inline-block bg-shrine-red text-white px-3 py-1 text-sm rounded-full mb-2">
            幸運物：{result.luckyItem}
          </div>
        </div>

        {/* Poem Section */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="flex-1 bg-stone-100 p-6 rounded-lg border border-stone-200 flex items-center justify-center">
                 <div className="font-serif text-xl md:text-2xl text-stone-700 leading-loose writing-vertical-rl md:writing-horizontal-tb text-center tracking-widest">
                     {result.poem}
                 </div>
            </div>
            <div className="flex-1 flex flex-col justify-center">
                <h3 className="font-bold text-shrine-wood mb-2 text-lg">詩意解說</h3>
                <p className="text-gray-600 text-sm leading-relaxed text-justify">
                    {result.poemExplanation}
                </p>
            </div>
        </div>

        {/* MBTI General Advice */}
        <div className="bg-red-50 p-6 rounded-lg border border-red-100 mb-8">
             <h3 className="text-center font-bold text-shrine-red text-lg mb-3">
                 給你的專屬指引
             </h3>
             <p className="text-gray-700 leading-relaxed text-justify">
                 {result.generalAdvice}
             </p>
        </div>

        {/* Categories Tabs */}
        <div className="mt-8">
            <div className="flex border-b border-gray-300">
                {(['love', 'career', 'family', 'health'] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-3 text-sm md:text-base font-serif transition-colors duration-200
                            ${activeTab === tab 
                                ? 'text-shrine-red border-b-2 border-shrine-red font-bold bg-red-50/50' 
                                : 'text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        {tab === 'love' && '愛情'}
                        {tab === 'career' && '事業'}
                        {tab === 'family' && '家人'}
                        {tab === 'health' && '健康'}
                    </button>
                ))}
            </div>
            <div className="p-6 bg-white border border-t-0 border-gray-200 min-h-[120px]">
                <p className="text-gray-700 leading-relaxed animate-fade-in">
                    {result.categories[activeTab]}
                </p>
            </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mt-8 justify-center">
        <button 
            onClick={onReset}
            className="flex items-center gap-2 px-6 py-3 bg-shrine-wood text-white rounded-full hover:bg-shrine-dark transition-all shadow-lg hover:shadow-xl font-medium"
        >
            <RefreshCw size={18} />
            再求一支
        </button>
        {/* Note: In a real app, implement native share API */}
        <button 
             onClick={() => alert("截圖分享給朋友吧！")}
             className="flex items-center gap-2 px-6 py-3 bg-white text-shrine-wood border-2 border-shrine-wood rounded-full hover:bg-stone-50 transition-all shadow-md font-medium"
        >
            <Share2 size={18} />
            分享籤詩
        </button>
      </div>
    </div>
  );
};
