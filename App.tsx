
import React, { useState, useEffect } from 'react';
import FloatingHearts from './components/FloatingHearts';
import ProposalCard from './components/ProposalCard';
import { generateLovePoem } from './services/geminiService';
import { AppState } from './types';
import { Sparkles, Music, Star, Heart as HeartIcon, Share2, CheckCircle2 } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.PROPOSAL);
  const [poem, setPoem] = useState<string>('Loading a special message for you...');
  const [loadingPoem, setLoadingPoem] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const name = "Nemmy";

  const handleAccept = async () => {
    setAppState(AppState.SUCCESS);
    setLoadingPoem(true);
    const generatedPoem = await generateLovePoem(name);
    setPoem(generatedPoem);
    setLoadingPoem(false);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative bg-gradient-to-br from-pink-100 via-white to-red-100">
      <FloatingHearts />
      
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-8 z-50 animate-in fade-in slide-in-from-top-8 duration-300">
          <div className="bg-white/90 backdrop-blur-md border border-pink-200 px-6 py-3 rounded-full shadow-xl flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <p className="font-semibold text-slate-700">Link copied! Send it to {name} ❤️</p>
          </div>
        </div>
      )}

      {appState === AppState.PROPOSAL ? (
        <ProposalCard name={name} onAccept={handleAccept} />
      ) : (
        <div className="z-10 w-full max-w-2xl bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border-4 border-red-400 text-center animate-in zoom-in-95 duration-700">
          <div className="flex justify-center gap-4 mb-6">
             <Star className="w-10 h-10 text-yellow-400 animate-spin" />
             <HeartIcon className="w-12 h-12 text-red-500 fill-red-500 animate-pulse" />
             <Sparkles className="w-10 h-10 text-pink-400 animate-bounce" />
          </div>

          <h1 className="text-5xl font-cursive text-red-600 mb-6">Yay! See You Soon, Valentine!</h1>
          
          <div className="bg-red-50/50 p-8 rounded-2xl border-2 border-dashed border-red-200 relative mb-8">
            <div className="absolute -top-4 -left-4 bg-red-500 text-white p-2 rounded-lg rotate-12">
               <Music className="w-5 h-5" />
            </div>
            {loadingPoem ? (
              <div className="space-y-3">
                <div className="h-4 bg-red-100 rounded animate-pulse w-3/4 mx-auto"></div>
                <div className="h-4 bg-red-100 rounded animate-pulse w-5/6 mx-auto"></div>
                <div className="h-4 bg-red-100 rounded animate-pulse w-2/3 mx-auto"></div>
              </div>
            ) : (
              <p className="text-2xl font-cursive text-slate-700 whitespace-pre-wrap leading-relaxed">
                {poem}
              </p>
            )}
            <div className="absolute -bottom-4 -right-4 bg-red-500 text-white p-2 rounded-lg -rotate-12">
               <HeartIcon className="w-5 h-5" />
            </div>
          </div>

          <p className="text-lg text-slate-600 italic">
            "I promise to make this Valentine's Day as beautiful as you are."
          </p>

          <button 
            onClick={() => window.location.reload()}
            className="mt-10 text-slate-400 hover:text-red-400 text-sm transition-colors"
          >
            Start over (but I'll still say yes)
          </button>
        </div>
      )}

      {/* Floating Share Button */}
      <button
        onClick={handleShare}
        className="fixed bottom-6 right-6 z-40 p-4 bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-2xl transition-all hover:scale-110 active:scale-90 group"
        title={`Share with ${name}`}
      >
        <div className="absolute -top-12 right-0 bg-slate-800 text-white text-xs py-1 px-3 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Share with {name}
        </div>
        <Share2 className="w-6 h-6" />
        <span className="absolute inset-0 rounded-full bg-pink-400 animate-ping opacity-20 pointer-events-none"></span>
      </button>

      {/* Footer Decoration */}
      <div className="fixed bottom-4 left-0 right-0 flex justify-center gap-8 opacity-40 pointer-events-none">
          <span className="text-4xl">🌹</span>
          <span className="text-4xl">🍫</span>
          <span className="text-4xl">🍷</span>
          <span className="text-4xl">🧸</span>
      </div>
    </div>
  );
};

export default App;
