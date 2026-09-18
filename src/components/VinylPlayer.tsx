import React from 'react';
import { motion } from 'framer-motion';

interface VinylPlayerProps {
  isPlaying: boolean;
}

export const VinylPlayer: React.FC<VinylPlayerProps> = ({ isPlaying }) => {
  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto flex items-center justify-center">
      {/* Record Sleeve/Background hint */}
      <div className="absolute inset-0 bg-retro-orange/20 rounded-lg transform -rotate-6 shadow-brutal translate-x-4 -z-10"></div>
      
      {/* Vinyl Record */}
      <motion.div
        className="w-full h-full rounded-full bg-retro-text relative shadow-xl overflow-hidden flex items-center justify-center"
        animate={{ rotate: isPlaying ? 360 : 0 }}
        transition={{
          repeat: isPlaying ? Infinity : 0,
          duration: 3,
          ease: "linear",
        }}
      >
        {/* Grooves */}
        <div className="absolute inset-2 rounded-full border border-gray-700/50"></div>
        <div className="absolute inset-6 rounded-full border border-gray-700/50"></div>
        <div className="absolute inset-10 rounded-full border border-gray-700/50"></div>
        <div className="absolute inset-14 rounded-full border border-gray-700/50"></div>
        
        {/* Center Label */}
        <div className="w-1/3 h-1/3 bg-retro-yellow rounded-full relative flex items-center justify-center border-4 border-retro-bg">
          {/* Hole */}
          <div className="w-4 h-4 bg-retro-bg rounded-full shadow-inner z-10"></div>
          {/* Label decorations */}
          <div className="absolute inset-1 border border-retro-orange/50 rounded-full"></div>
          <div className="absolute top-2 left-0 right-0 text-[8px] text-center font-serif font-bold text-retro-text tracking-widest uppercase opacity-70">
            STEREO
          </div>
        </div>
        
        {/* Highlight for shiny effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none rounded-full"></div>
      </motion.div>
    </div>
  );
};
