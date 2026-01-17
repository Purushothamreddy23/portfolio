
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Command, X, Send, Cpu, ChevronRight, Terminal } from 'lucide-react';
import { askGeminiAboutProfile } from '../services/geminiService';
import { profileData } from '../data';
import { Message } from '../types';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: `[SYSTEM_INIT] Hello. I am the Sterling-Core AI. How can I assist your query?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const response = await askGeminiAboutProfile(input, profileData);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-12 right-12 z-[100]">
      <AnimatePresence>
        {isOpen && (
          // Cast motion.div props to any to avoid "initial property does not exist" type errors
          <motion.div
            {...({
              initial: { opacity: 0, y: 40, scale: 0.95 },
              animate: { opacity: 1, y: 0, scale: 1 },
              exit: { opacity: 0, y: 40, scale: 0.95 },
              transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
            } as any)}
            className="mb-8 w-[350px] md:w-[450px] h-[600px] bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Minimal Command Bar Header */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white/40 animate-pulse"></div>
                <span className="mono-font text-[10px] uppercase font-bold tracking-[0.2em] text-white/60">AI_CORE_TERMINAL</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="opacity-40 hover:opacity-100 transition-opacity">
                <X size={14} />
              </button>
            </div>

            {/* Chat Log */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 mono-font text-[11px] leading-relaxed">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'opacity-80' : ''}`}>
                  <span className="text-white/30 shrink-0">[{msg.role === 'user' ? 'USER' : 'CORE'}]</span>
                  <div className="text-white/90 whitespace-pre-wrap">{msg.content}</div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-4">
                  <span className="text-white/30 shrink-0">[CORE]</span>
                  <div className="flex gap-1 items-center">
                    <div className="w-1 h-1 bg-white/40 animate-bounce"></div>
                    <div className="w-1 h-1 bg-white/40 animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1 h-1 bg-white/40 animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Terminal Input */}
            <div className="p-4 border-t border-white/5 bg-white/[0.01]">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex items-center gap-3"
              >
                <ChevronRight className="text-white/20" size={16} />
                <input
                  autoFocus
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="QUERY_THE_CORE..."
                  className="flex-1 bg-transparent border-none p-0 text-[11px] mono-font focus:ring-0 text-white placeholder:text-white/10"
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cast motion.button props to any to avoid "whileHover property does not exist" type errors */}
      <motion.button
        {...({
          onClick: () => setIsOpen(!isOpen),
          whileHover: { scale: 1.05 },
          whileTap: { scale: 0.95 }
        } as any)}
        className="w-16 h-16 bg-white flex items-center justify-center rounded-full shadow-2xl relative group"
      >
        <div className="absolute inset-0 bg-white/20 rounded-full scale-110 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
        {isOpen ? <X size={24} className="text-black" /> : <Terminal size={24} className="text-black" />}
      </motion.button>
    </div>
  );
};

export default ChatBot;
