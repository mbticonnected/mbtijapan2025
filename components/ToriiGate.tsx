import React from 'react';

export const ToriiGate: React.FC = () => {
  return (
    <div className="relative w-64 h-48 mx-auto mb-8 animate-fade-in select-none">
      {/* Top Bar (Kasagi) */}
      <div className="absolute top-0 left-0 w-full h-4 bg-shrine-red rounded-full shadow-md z-20 flex items-center justify-center">
        <div className="w-[104%] h-full bg-shrine-red rounded-full -rotate-1"></div>
      </div>
      
      {/* Second Bar (Shimaki) - usually blended, simplify for CSS */}
      <div className="absolute top-6 left-2 w-[calc(100%-16px)] h-3 bg-shrine-red rounded-full z-20"></div>

      {/* Support Beam (Nuki) */}
      <div className="absolute top-16 left-4 w-[calc(100%-32px)] h-3 bg-shrine-red z-10"></div>
      
      {/* Vertical Pillars (Hashira) */}
      <div className="absolute top-0 left-10 w-4 h-48 bg-shrine-red rounded-t-sm border-l-2 border-shrine-dark shadow-sm z-10"></div>
      <div className="absolute top-0 right-10 w-4 h-48 bg-shrine-red rounded-t-sm border-r-2 border-shrine-dark shadow-sm z-10"></div>
      
      {/* Name Tablet (Gaku) */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-10 h-14 bg-black border-2 border-shrine-gold flex items-center justify-center z-20 shadow-lg">
        <span className="text-shrine-gold text-[10px] font-bold writing-vertical-rl">MBTI</span>
      </div>

       {/* Ropes (Shimenawa) - abstract */}
       <div className="absolute top-16 left-1/2 -translate-x-1/2 w-32 h-12 border-b-2 border-dashed border-white opacity-60 rounded-full"></div>
    </div>
  );
};
