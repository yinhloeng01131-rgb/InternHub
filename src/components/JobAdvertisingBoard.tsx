import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Megaphone, ExternalLink, MapPin, Calendar, Briefcase } from 'lucide-react';
import { Card } from './UI';

interface SiemReapInternship {
  id: string;
  title: string;
  company: string;
  source: string;
  date: string;
  link: string;
}

const MOCK_SIEM_REAP_INTERNSHIPS: SiemReapInternship[] = [
  {
    id: 'sr1',
    title: 'Guest Relations Intern',
    company: 'Amansara Resort',
    source: 'Telegram: Siem Reap Job Announcement',
    date: 'Just now',
    link: 'https://t.me/SiemReapJobAnnouncement'
  },
  {
    id: 'sr2',
    title: 'NGO Management Intern',
    company: 'Angkor Hospital for Children',
    source: 'Website: AHC Careers',
    date: '2 hours ago',
    link: 'https://angkorhospital.org'
  },
  {
    id: 'sr3',
    title: 'Sustainable Tourism Intern',
    company: 'Jaya House River Park',
    source: 'Facebook: Siem Reap Jobs',
    date: '5 hours ago',
    link: 'https://facebook.com/groups/siemreapjobs'
  },
  {
    id: 'sr4',
    title: 'Arts & Culture Intern',
    company: 'Phare, The Cambodian Circus',
    source: 'Telegram: Siem Reap Job Announcement',
    date: 'Yesterday',
    link: 'https://t.me/SiemReapJobAnnouncement'
  },
  {
    id: 'sr5',
    title: 'Digital Marketing Intern',
    company: 'Treeline Urban Resort',
    source: 'Website: Treeline Careers',
    date: 'Yesterday',
    link: 'https://treelinehotels.com'
  }
];

export const JobAdvertisingBoard: React.FC<{ lang: 'en' | 'km' }> = ({ lang }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MOCK_SIEM_REAP_INTERNSHIPS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentInternship = MOCK_SIEM_REAP_INTERNSHIPS[currentIndex];

  return (
    <Card className="bg-indigo-900 border-none shadow-xl shadow-indigo-200/50 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute bottom-0 left-0 -mb-4 -ml-4 h-24 w-24 rounded-full bg-indigo-500/20 blur-2xl" />
      
      <div className="p-4 relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-1.5 rounded-lg">
              <Megaphone size={16} className="text-white" />
            </div>
            <span className="text-[10px] font-black text-indigo-100 uppercase tracking-widest">
              {lang === 'en' ? 'Siem Reap Internship Feed' : 'ការប្រកាសកម្មសិក្សានៅសៀមរាប'}
            </span>
          </div>
          <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full">
            <div className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[8px] font-bold text-indigo-100 uppercase tracking-tighter">Live Updates</span>
          </div>
        </div>

        <div className="h-20 flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentInternship.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <div className="flex flex-col">
                <h4 className="text-white font-bold text-sm line-clamp-1">{currentInternship.title}</h4>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1 text-indigo-200 text-[10px]">
                    <Briefcase size={10} />
                    <span className="truncate max-w-[120px]">{currentInternship.company}</span>
                  </div>
                  <div className="flex items-center gap-1 text-indigo-200 text-[10px]">
                    <MapPin size={10} />
                    <span>Siem Reap</span>
                  </div>
                  <div className="flex items-center gap-1 text-indigo-200 text-[10px]">
                    <Calendar size={10} />
                    <span>{currentInternship.date}</span>
                  </div>
                </div>
                <p className="text-[9px] text-indigo-300 mt-1 italic opacity-80">Source: {currentInternship.source}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex gap-1">
            {MOCK_SIEM_REAP_INTERNSHIPS.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-4 bg-white' : 'w-1 bg-white/30'}`} 
              />
            ))}
          </div>
          <a 
            href={currentInternship.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[10px] font-bold text-white hover:underline"
          >
            {lang === 'en' ? 'View Details' : 'មើលលម្អិត'}
            <ExternalLink size={10} />
          </a>
        </div>
      </div>
    </Card>
  );
};
