import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, User, Bot, Sparkles, Loader2 } from 'lucide-react';
import { ChatSession, Message, UserProfile, Internship } from '../types';
import { Card, Button, cn, Badge } from './UI';
import { GoogleGenAI } from "@google/genai";

interface ChatWindowProps {
  session: ChatSession;
  onClose: () => void;
  onSendMessage: (sessionId: string, message: Message) => void;
  user: UserProfile;
  internships: Internship[];
  lang: 'en' | 'km';
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ session, onClose, onSendMessage, user, internships, lang }) => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isAI = session.companyId === 'ai-assistant';

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [session.messages, isLoading]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userText = inputText.trim();
    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      senderId: 'user',
      receiverId: session.companyId,
      text: userText,
      timestamp: new Date().toISOString(),
    };

    onSendMessage(session.companyId, userMsg);
    setInputText('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const model = "gemini-3-flash-preview";
      
      let context = '';
      let senderId = session.companyId;

      if (isAI) {
        context = `
          You are a helpful career assistant for a student internship platform in Cambodia called InternHub.
          Student Profile:
          - Name: ${user.name}
          - Major: ${user.major}
          - University: ${user.university}
          - Interests: ${user.interests.join(', ')}
          
          Available Internships:
          ${internships.map(i => `- ${i.title} at ${i.companyName} (${i.location})`).join('\n')}
          
          Task:
          Answer the student's question about job positions, companies, or career advice.
          Be encouraging, professional, and specific.
          Respond in ${lang === 'en' ? 'English' : 'Khmer'}.
        `;
      } else {
        const internship = internships.find(i => i.id === session.companyId);
        context = `
          You are a HR representative or Hiring Manager from ${session.companyName}.
          A student named ${user.name} is chatting with you about an internship.
          
          Company Info: ${internship?.companyDescription || session.companyName}
          Internship Position: ${internship?.title || 'Internship'}
          
          Student Profile:
          - Major: ${user.major}
          - University: ${user.university}
          - Interests: ${user.interests.join(', ')}
          
          Task:
          Reply to the student's message as a professional company representative.
          Be polite, helpful, and realistic. If they ask about the position, refer to the company info.
          Respond in ${lang === 'en' ? 'English' : 'Khmer'}.
        `;
      }

      // Add a small artificial delay for realism if it's a company
      if (!isAI) {
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      const response = await ai.models.generateContent({
        model,
        contents: [
          { role: 'user', parts: [{ text: context }] },
          { role: 'user', parts: [{ text: userText }] }
        ],
      });

      const botResponse = response.text || (lang === 'en' ? "I'm sorry, I couldn't process that. Please try again." : "សូមអភ័យទោស ខ្ញុំមិនអាចដំណើរការវាបានទេ។ សូមព្យាយាមម្តងទៀត។");
      
      const replyMsg: Message = {
        id: `msg-reply-${Date.now()}`,
        senderId: senderId,
        receiverId: 'user',
        text: botResponse,
        timestamp: new Date().toISOString(),
      };
      onSendMessage(session.companyId, replyMsg);
    } catch (error) {
      console.error('AI Error:', error);
      const errorMsg: Message = {
        id: `msg-err-${Date.now()}`,
        senderId: session.companyId,
        receiverId: 'user',
        text: lang === 'en' ? "Sorry, I'm having trouble connecting right now." : "សូមអភ័យទោស ខ្ញុំកំពុងមានបញ្ហាក្នុងការតភ្ជាប់នៅពេលនេះ។",
        timestamp: new Date().toISOString(),
      };
      onSendMessage(session.companyId, errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 backdrop-blur-sm sm:items-center p-0 sm:p-4">
      <motion.div 
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        className="w-full max-w-lg h-[80vh] flex flex-col rounded-t-[32px] bg-white shadow-2xl sm:rounded-[32px] overflow-hidden"
      >
        {/* Header */}
        <div className={cn(
          "flex items-center justify-between border-b border-slate-100 p-4",
          isAI ? "bg-indigo-600 text-white" : "bg-white"
        )}>
          <div className="flex items-center gap-3">
            <div className={cn(
              "h-10 w-10 rounded-full overflow-hidden flex items-center justify-center",
              isAI ? "bg-white/20" : "bg-slate-100"
            )}>
              {isAI ? <Bot size={24} /> : <img src={session.companyLogo} alt={session.companyName} className="h-full w-full object-cover" />}
            </div>
            <div>
              <h3 className={cn("text-sm font-bold", isAI ? "text-white" : "text-slate-900")}>{session.companyName}</h3>
              <div className="flex items-center gap-1">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <p className={cn("text-[10px] font-medium", isAI ? "text-indigo-100" : "text-emerald-500")}>Online</p>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className={cn(
              "rounded-full p-2 transition-colors",
              isAI ? "hover:bg-white/10 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
            )}
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
          {session.messages.map((msg) => (
            <div key={msg.id} className={cn("flex gap-2", msg.senderId === 'user' ? "flex-row-reverse" : "flex-row")}>
              <div className={cn(
                "h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0",
                msg.senderId === 'user' ? "bg-slate-100 text-slate-600" : (isAI ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-600")
              )}>
                {msg.senderId === 'user' ? <User size={18} /> : (isAI ? <Bot size={18} /> : <img src={session.companyLogo} alt={session.companyName} className="h-full w-full rounded-lg object-cover" />)}
              </div>
              <div className={cn(
                "max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm",
                msg.senderId === 'user' 
                  ? "bg-indigo-600 text-white rounded-tr-none" 
                  : "bg-slate-50 text-slate-800 rounded-tl-none border border-slate-100"
              )}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-2">
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
        <div className="border-t border-slate-100 p-4 bg-white">
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder={isAI ? "Ask AI Assistant..." : "Type a message..."} 
              className="flex-1 rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button size="sm" onClick={handleSend} className="rounded-xl" disabled={isLoading}>
              <Send size={18} />
            </Button>
          </div>
          {isAI && (
            <p className="text-[10px] text-center text-slate-400 mt-2 flex items-center justify-center gap-1">
              <Sparkles size={10} /> Powered by Gemini AI
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export const ChatList: React.FC<{ sessions: ChatSession[], onSelect: (session: ChatSession) => void }> = ({ sessions, onSelect }) => {
  const sortedSessions = [...sessions].sort((a, b) => {
    if (a.companyId === 'ai-assistant') return -1;
    if (b.companyId === 'ai-assistant') return 1;
    return 0;
  });

  return (
    <div className="space-y-3">
      {sortedSessions.map((session) => (
        <Card key={session.companyId} className={cn(
          "p-4 cursor-pointer transition-all",
          session.companyId === 'ai-assistant' ? "bg-indigo-50 border-indigo-100 hover:bg-indigo-100" : "hover:bg-slate-50"
        )} onClick={() => onSelect(session)}>
          <div className="flex items-center gap-4">
            <div className={cn(
              "h-12 w-12 rounded-full overflow-hidden flex items-center justify-center",
              session.companyId === 'ai-assistant' ? "bg-indigo-600 text-white" : "bg-slate-100"
            )}>
              {session.companyId === 'ai-assistant' ? <Bot size={28} /> : <img src={session.companyLogo} alt={session.companyName} className="h-full w-full object-cover" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900 truncate">{session.companyName}</h4>
                  {session.companyId === 'ai-assistant' && (
                    <Badge variant="outline" className="text-[8px] px-1 py-0 border-indigo-200 text-indigo-600 bg-white">AI</Badge>
                  )}
                </div>
                <span className="text-[10px] text-slate-400">Now</span>
              </div>
              <p className="text-xs text-slate-500 truncate">{session.lastMessage}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
