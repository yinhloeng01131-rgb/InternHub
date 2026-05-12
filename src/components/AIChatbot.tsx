import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Bot, Sparkles, User, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Internship, UserProfile } from '../types';
import { Button, Card } from './UI';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

interface AIChatbotProps {
  onClose: () => void;
  user: UserProfile;
  internships: Internship[];
  lang: 'en' | 'km';
}

export const AIChatbot: React.FC<AIChatbotProps> = ({ onClose, user, internships, lang }) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'bot', 
      text: lang === 'en' 
        ? `Hi ${user.name}! I'm your AI Career Assistant. Based on your major in ${user.major}, I can help you find the perfect internship. What would you like to know?` 
        : `សួស្តី ${user.name}! ខ្ញុំជាជំនួយការអាជីព AI របស់អ្នក។ ផ្អែកលើជំនាញ ${user.major} របស់អ្នក ខ្ញុំអាចជួយអ្នកស្វែងរកកម្មសិក្សាដែលល្អបំផុត។ តើអ្នកចង់ដឹងអ្វីខ្លះ?` 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const model = "gemini-3-flash-preview";
      
      const context = `
        You are a helpful career assistant for a student internship platform in Cambodia called InternHub.
        Student Profile:
        - Name: ${user.name}
        - Major: ${user.major}
        - University: ${user.university}
        - Interests: ${user.interests.join(', ')}
        
        Available Internships:
        ${internships.map(i => `- ${i.title} at ${i.companyName} (${i.location})`).join('\n')}
        
        Task:
        Answer the student's question about job positions and companies that suit them.
        Be encouraging, professional, and specific. If a specific internship from the list suits them, mention it.
        Respond in ${lang === 'en' ? 'English' : 'Khmer'}.
      `;

      const response = await ai.models.generateContent({
        model,
        contents: [
          { role: 'user', parts: [{ text: context }] },
          { role: 'user', parts: [{ text: userMessage }] }
        ],
      });

      const botResponse = response.text || (lang === 'en' ? "I'm sorry, I couldn't process that. Please try again." : "សូមអភ័យទោស ខ្ញុំមិនអាចដំណើរការវាបានទេ។ សូមព្យាយាមម្តងទៀត។");
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { role: 'bot', text: lang === 'en' ? "Sorry, I'm having trouble connecting right now." : "សូមអភ័យទោស ខ្ញុំកំពុងមានបញ្ហាក្នុងការតភ្ជាប់នៅពេលនេះ។" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-slate-900/50 backdrop-blur-sm sm:items-center p-0 sm:p-4">
      <motion.div 
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        className="w-full max-w-lg rounded-t-[32px] bg-white shadow-2xl sm:rounded-[32px] overflow-hidden flex flex-col h-[80vh]"
      >
        {/* Header */}
        <div className="bg-indigo-600 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl">
              <Bot size={24} />
            </div>
            <div>
              <h3 className="font-bold">{lang === 'en' ? 'AI Career Assistant' : 'ជំនួយការអាជីព AI'}</h3>
              <div className="flex items-center gap-1 text-[10px] opacity-80">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Online
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
          {messages.map((msg, idx) => (
            <div key={idx} className={cn("flex gap-3", msg.role === 'user' ? "flex-row-reverse" : "")}>
              <div className={cn(
                "h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0",
                msg.role === 'bot' ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-600"
              )}>
                {msg.role === 'bot' ? <Bot size={18} /> : <User size={18} />}
              </div>
              <div className={cn(
                "max-w-[80%] p-3 rounded-2xl text-sm",
                msg.role === 'bot' 
                  ? "bg-slate-50 text-slate-800 rounded-tl-none border border-slate-100" 
                  : "bg-indigo-600 text-white rounded-tr-none"
              )}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <Bot size={18} />
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl rounded-tl-none border border-slate-100">
                <Loader2 size={18} className="animate-spin text-indigo-600" />
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={lang === 'en' ? "Ask about jobs, companies..." : "សួរអំពីការងារ ក្រុមហ៊ុន..."}
              className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-indigo-500"
            />
            <Button 
              size="sm" 
              className="rounded-xl px-4" 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
            >
              <Send size={18} />
            </Button>
          </div>
          <p className="text-[10px] text-center text-slate-400 mt-2 flex items-center justify-center gap-1">
            <Sparkles size={10} /> Powered by Gemini AI
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');
