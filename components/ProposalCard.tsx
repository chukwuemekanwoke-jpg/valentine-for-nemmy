
import React, { useState, useCallback } from 'react';
import { Heart, Send, AlertCircle, MailOpen, Lock } from 'lucide-react';

interface ProposalCardProps {
  onAccept: () => void;
  name: string;
}

const ProposalCard: React.FC<ProposalCardProps> = ({ onAccept, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [showReasons, setShowReasons] = useState(false);
  const [reasonText, setReasonText] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const moveNoButton = useCallback(() => {
    const x = Math.random() * 300 - 150;
    const y = Math.random() * 300 - 150;
    setNoButtonPos({ x, y });
  }, []);

  const handleFakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reasonText.trim()) return;

    setSubmissionStatus('submitting');
    
    setTimeout(() => {
      setSubmissionStatus('error');
      const errors = [
        "System Error: Nemmy is too beautiful to say no.",
        "Error 403: Rejection access denied by the Universe.",
        "Failed to send: The 'No' database is currently on vacation.",
        "Buffer Overflow: Love levels exceeded safe operating parameters.",
        "Critical Error: Rejection.exe has stopped working permanently."
      ];
      setErrorMsg(errors[Math.floor(Math.random() * errors.length)]);
    }, 1500);
  };

  if (!isOpen) {
    return (
      <div 
        onClick={() => setIsOpen(true)}
        className="z-10 w-full max-w-sm bg-white rounded-3xl p-12 border-4 border-pink-200 envelope-shadow flex flex-col items-center cursor-pointer transform hover:scale-105 transition-all group relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-pink-400"></div>
        <div className="bg-pink-50 p-6 rounded-full mb-6 group-hover:bg-pink-100 transition-colors">
          <MailOpen className="w-16 h-16 text-pink-500 animate-bounce" />
        </div>
        <h2 className="text-2xl font-bold text-slate-700 mb-2">A message for {name}</h2>
        <p className="text-slate-400 italic">Tap to open your heart letter...</p>
        <div className="mt-8 flex gap-2">
          {[1,2,3].map(i => <Heart key={i} className="w-4 h-4 text-pink-300 fill-pink-300" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-pink-100 flex flex-col items-center text-center animate-in zoom-in-95 duration-500">
      <div className="bg-red-50 p-4 rounded-full mb-6 ring-4 ring-pink-50">
        <Heart className="w-12 h-12 text-red-500 fill-red-500 animate-pulse" />
      </div>

      <h1 className="text-4xl font-cursive text-red-600 mb-2">Dearest {name},</h1>
      <p className="text-xl font-semibold text-slate-700 mb-8 leading-relaxed px-4">
        Will you be my Valentine and make me the happiest person alive?
      </p>

      <div className="flex flex-wrap justify-center gap-4 mb-8 relative h-16 w-full">
        <button
          onClick={onAccept}
          className="px-10 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-full font-bold text-xl shadow-lg transform hover:scale-110 transition-all active:scale-95"
        >
          YES! ❤️
        </button>

        <button
          onMouseEnter={moveNoButton}
          onClick={moveNoButton}
          style={{ 
            transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
            position: noButtonPos.x === 0 ? 'relative' : 'absolute'
          }}
          className="px-8 py-3 bg-slate-100 text-slate-400 rounded-full font-bold text-lg transition-all duration-150 ease-out border border-slate-200"
        >
          No...
        </button>
      </div>

      <button 
        onClick={() => setShowReasons(!showReasons)}
        className="text-sm text-pink-400 hover:text-pink-600 underline transition-colors flex items-center gap-1"
      >
        <AlertCircle className="w-3 h-3" />
        {showReasons ? "Actually, forget it, let's just say yes" : "I have objections..."}
      </button>

      {showReasons && (
        <div className="mt-6 w-full animate-in slide-in-from-bottom-4 duration-500">
          <div className="bg-pink-50/50 p-4 rounded-2xl border-2 border-dashed border-pink-200">
            <h3 className="text-xs font-bold text-pink-400 uppercase tracking-widest mb-3">Mischief Log</h3>
            <form onSubmit={handleFakeSubmit} className="space-y-4">
              <textarea
                value={reasonText}
                onChange={(e) => {
                    setReasonText(e.target.value);
                    if(submissionStatus === 'error') setSubmissionStatus('idle');
                }}
                placeholder="Why would you ever say no? :P"
                className="w-full p-4 rounded-xl border border-pink-100 focus:border-pink-300 focus:ring-0 outline-none text-slate-600 bg-white/80 resize-none h-20 text-sm"
              />

              <button
                type="submit"
                disabled={submissionStatus === 'submitting'}
                className="w-full py-2 bg-pink-400 hover:bg-pink-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-md"
              >
                {submissionStatus === 'submitting' ? (
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Attempt Rejection
                  </>
                )}
              </button>
            </form>

            {submissionStatus === 'error' && (
              <div className="mt-4 p-3 bg-red-500 text-white rounded-xl flex items-center gap-2 text-left animate-bounce shadow-lg">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="text-[10px] leading-tight font-bold uppercase">{errorMsg}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProposalCard;
