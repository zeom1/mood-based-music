import React from 'react';
import { Coffee, Moon, Sun, Flame, CloudRain, Zap } from 'lucide-react';

export interface MoodPreset {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const presets: MoodPreset[] = [
  { id: 'morning_coffee', label: 'Morning Coffee', icon: <Coffee size={24} />, color: 'bg-retro-orange text-white' },
  { id: 'late_night', label: 'Late Night Drive', icon: <Moon size={24} />, color: 'bg-retro-text text-retro-bg' },
  { id: 'sunday_sun', label: 'Sunday Sunshine', icon: <Sun size={24} />, color: 'bg-retro-yellow text-retro-text' },
  { id: 'focus_deep', label: 'Deep Focus', icon: <Zap size={24} />, color: 'bg-retro-teal text-white' },
  { id: 'rainy_day', label: 'Rainy Window', icon: <CloudRain size={24} />, color: 'bg-retro-brown text-retro-bg' },
  { id: 'party_energy', label: 'High Energy', icon: <Flame size={24} />, color: 'bg-orange-500 text-white' },
];

interface BentoGridProps {
  onSelectMood: (mood: string) => void;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ onSelectMood }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {presets.map((preset, index) => (
        <button
          key={preset.id}
          onClick={() => onSelectMood(preset.label)}
          className={`
            relative group overflow-hidden rounded-xl p-6 text-left transition-all duration-200 
            ${preset.color} 
            hover:-translate-y-1 hover:-translate-x-1 hover:shadow-brutal
            focus:outline-none focus:ring-4 focus:ring-retro-orange/50
            ${index === 0 ? 'col-span-2 row-span-1 md:col-span-1 md:row-span-2' : ''}
            ${index === 3 ? 'md:col-span-2' : ''}
          `}
        >
          <div className="flex flex-col h-full justify-between gap-4">
            <div className="opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform origin-left">
              {preset.icon}
            </div>
            <span className="font-serif font-bold text-lg leading-tight">
              {preset.label}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};
