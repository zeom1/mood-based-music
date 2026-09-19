import React, { useState, useEffect } from 'react';
import { VinylPlayer } from './components/VinylPlayer';
import { BentoGrid } from './components/BentoGrid';
import { getRecommendations, type SongRecommendation } from './services/gemini';
import { Music, Loader2, Sparkles, Moon, Sun } from 'lucide-react';

function App() {
  const [mood, setMood] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [recommendations, setRecommendations] = useState<SongRecommendation[]>([]);
  const [error, setError] = useState('');
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check local storage or system preference on initial load
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const handleGenerate = async (selectedMood?: string) => {
    const targetMood = selectedMood || mood;
    if (!targetMood.trim()) {
      setError('Please enter or select a mood.');
      return;
    }

    setError('');
    setIsGenerating(true);
    setMood(targetMood);

    try {
      const results = await getRecommendations(targetMood);
      setRecommendations(results);
    } catch (err: any) {
      setError(err.message || 'Failed to generate recommendations. Please check your API key in .env file.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-retro-bg flex flex-col font-sans transition-colors duration-300">
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
        {/* Dark Mode Toggle */}
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="absolute top-6 right-6 md:top-12 md:right-12 z-10 p-3 rounded-full bg-retro-text text-retro-bg hover:scale-110 transition-transform shadow-brutal"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Left Column: Editorial Info & Input */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <header className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-serif font-black uppercase leading-[0.9] text-retro-text tracking-tighter">
              The <br />
              <span className="text-retro-orange">Mood</span> <br />
              Machine.
            </h1>
            <p className="text-lg md:text-xl font-medium text-retro-text/80 max-w-sm">
              Curated sonic experiences for your exact state of mind. Powered by AI, designed with soul.
            </p>
          </header>

          <div className="space-y-4 bg-retro-surface p-6 border-4 border-retro-text shadow-brutal rounded-xl relative">
            <div className="absolute -top-3 -right-3 bg-retro-teal text-retro-bg p-2 rounded-full border-2 border-retro-text">
              <Sparkles size={20} />
            </div>
            <label className="block font-serif font-bold text-xl">What's the vibe?</label>
            <textarea
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              placeholder="e.g. Walking alone in the city at midnight..."
              className="w-full h-24 p-3 bg-retro-bg/50 border-2 border-retro-text/20 focus:border-retro-orange outline-none resize-none font-mono text-sm rounded-md"
            />
            <button
              onClick={() => handleGenerate()}
              disabled={isGenerating}
              className="w-full bg-retro-text text-retro-bg font-bold uppercase tracking-widest py-3 px-4 rounded hover:bg-retro-orange transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {isGenerating ? <Loader2 className="animate-spin" /> : <Music size={18} />}
              {isGenerating ? 'Spinning...' : 'Drop the Needle'}
            </button>
          </div>

          <div className="mt-4 space-y-2">
            <h3 className="font-serif font-bold text-xl border-b-2 border-retro-text/10 pb-2">Or pick a preset</h3>
            <BentoGrid onSelectMood={(m) => {
              setMood(m);
              handleGenerate(m);
            }} />
          </div>
        </div>

        {/* Right Column: Player & Recommendations */}
        <div className="lg:col-span-7 flex flex-col gap-12">
          
          {/* Vinyl Player Section */}
          <div className="bg-retro-brown p-8 md:p-12 rounded-3xl border-4 border-retro-text shadow-brutal-lg flex flex-col items-center justify-center min-h-[400px]">
            <VinylPlayer isPlaying={isGenerating} />
            
            {error && (
              <div className="mt-8 bg-red-100 text-red-800 p-4 rounded-lg font-mono text-sm border-2 border-red-800 text-center w-full max-w-md">
                {error}
              </div>
            )}

            {!isGenerating && recommendations.length === 0 && !error && (
              <p className="mt-12 text-retro-bg/60 font-serif italic text-xl text-center max-w-md">
                "Music is the emotional life of most people."<br/> 
                <span className="text-sm font-sans not-italic block mt-2 opacity-80">— Leonard Cohen</span>
              </p>
            )}

            {isGenerating && (
              <p className="mt-12 text-retro-yellow font-serif italic text-xl animate-pulse">
                Consulting the archives...
              </p>
            )}
          </div>

          {/* Recommendations List */}
          {recommendations.length > 0 && !isGenerating && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h2 className="text-3xl font-serif font-bold text-retro-text border-b-4 border-retro-text pb-4 flex items-center justify-between">
                <span>Your Playlist</span>
                <span className="text-sm font-mono bg-retro-text text-retro-bg py-1 px-3 rounded-full">SIDE A</span>
              </h2>
              
              <div className="space-y-4">
                {recommendations.map((song, idx) => (
                  <div key={idx} className="group bg-retro-surface border-2 border-retro-text p-4 rounded-lg hover:shadow-brutal transition-shadow flex gap-4 items-start">
                    <div className="font-mono font-bold text-retro-orange text-2xl w-8 pt-1">
                      0{idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-4 mb-2">
                        <h3 className="text-xl font-bold font-serif leading-none">{song.title}</h3>
                        <p className="text-sm font-mono font-medium text-retro-text/70">{song.artist}</p>
                      </div>
                      <div className="flex gap-3 text-xs font-mono uppercase tracking-wider text-retro-text/50 mb-3">
                        <span className="bg-retro-bg px-2 py-0.5 rounded border border-retro-text/10">{song.album}</span>
                        <span className="bg-retro-bg px-2 py-0.5 rounded border border-retro-text/10">{song.year}</span>
                      </div>
                      <p className="text-sm text-retro-text/80 leading-relaxed italic border-l-2 border-retro-orange pl-3">
                        {song.reason}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
        </div>
      </main>
    </div>
  );
}

export default App;
