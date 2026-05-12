import React from 'react';
import { motion } from 'motion/react';
import { X, Smartphone, Search, GraduationCap, MessageSquare, FileText } from 'lucide-react';
import { Card, Button } from './UI';

export const HowToUse: React.FC<{ onClose: () => void, lang: 'en' | 'km' }> = ({ onClose, lang }) => {
  const steps = [
    { 
      icon: <Search className="text-indigo-600" />, 
      title: lang === 'en' ? "Find Internships" : "ស្វែងរកកម្មសិក្សា", 
      desc: lang === 'en' ? "Browse through various internship opportunities tailored to your major." : "រកមើលឱកាសកម្មសិក្សានានាដែលត្រូវនឹងជំនាញរបស់អ្នក។" 
    },
    { 
      icon: <GraduationCap className="text-emerald-600" />, 
      title: lang === 'en' ? "Set Goals" : "កំណត់គោលដៅ", 
      desc: lang === 'en' ? "Complete mini-tasks and courses to earn pts and build your career profile." : "បំពេញភារកិច្ចតូចៗនិងវគ្គសិក្សាដើម្បីទទួលបាន pts និងកសាងប្រវត្តិរូបអាជីពរបស់អ្នក។" 
    },
    { 
      icon: <MessageSquare className="text-amber-600" />, 
      title: lang === 'en' ? "Chat with Companies" : "ជជែកជាមួយក្រុមហ៊ុន", 
      desc: lang === 'en' ? "Directly message recruiters to ask questions about the role." : "ផ្ញើសារដោយផ្ទាល់ទៅកាន់អ្នកជ្រើសរើសបុគ្គលិកដើម្បីសួរអំពីតួនាទី។" 
    },
    { 
      icon: <FileText className="text-rose-600" />, 
      title: lang === 'en' ? "Build your CV" : "បង្កើតប្រវត្តិរូប", 
      desc: lang === 'en' ? "Use our built-in tools to create a professional resume." : "ប្រើឧបករណ៍ដែលមានស្រាប់របស់យើងដើម្បីបង្កើតប្រវត្តិរូបអាជីព។" 
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[32px] bg-white p-0 shadow-2xl no-scrollbar"
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4">
          <h3 className="text-lg font-bold">{lang === 'en' ? "How to use this app" : "របៀបប្រើកម្មវិធីនេះ"}</h3>
          <button onClick={onClose} className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center">
            <Smartphone className="mx-auto mb-4 text-indigo-600" size={48} />
            <p className="text-sm text-slate-600 leading-relaxed">
              {lang === 'en' ? "Welcome to InternHub! Here's a quick guide to help you get started." : "សូមស្វាគមន៍មកកាន់ InternHub! នេះគឺជាមគ្គុទ្ទេសក៍រហ័សដើម្បីជួយអ្នកចាប់ផ្តើម។"}
            </p>
          </div>

          <div className="space-y-6">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0 mt-1">{step.icon}</div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{step.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Button className="w-full" onClick={onClose}>
            {lang === 'en' ? "Got it!" : "យល់ហើយ!"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export const CVSample: React.FC<{ onClose: () => void, lang: 'en' | 'km' }> = ({ onClose, lang }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[32px] bg-white p-0 shadow-2xl no-scrollbar"
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4">
          <h3 className="text-lg font-bold">{lang === 'en' ? "CV Sample" : "គំរូ CV"}</h3>
          <button onClick={onClose} className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 bg-slate-50">
          <div className="border border-slate-200 p-8 shadow-sm rounded-lg bg-white text-slate-900 font-serif max-w-[210mm] mx-auto">
            <div className="flex justify-between items-start mb-8 border-b-2 border-indigo-600 pb-4">
              <div className="flex gap-4 items-center">
                <div className="h-20 w-20 rounded-2xl bg-slate-50 p-1 border border-slate-100">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200" 
                    alt="Avatar" 
                    className="h-full w-full rounded-xl object-cover" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-indigo-900">REUK YINHLOENG</h2>
                  <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest mt-1">Marketing Student</p>
                </div>
              </div>
              <div className="text-right text-[10px] space-y-1 text-slate-500">
                <p className="flex items-center justify-end gap-1"><Smartphone size={10} /> +855 11 297 431</p>
                <p className="flex items-center justify-end gap-1"><FileText size={10} /> reukyinhloeng51@gmail.com</p>
                <p>Siem Reap, Cambodia</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8">
              <div className="col-span-1 space-y-6 border-r border-slate-100 pr-4">
                <section>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-3">Personal</h3>
                  <div className="space-y-2 text-[10px]">
                    <div><p className="text-slate-400">Sex</p><p className="font-bold">Female</p></div>
                    <div><p className="text-slate-400">Age</p><p className="font-bold">19 Years Old</p></div>
                    <div><p className="text-slate-400">Nationality</p><p className="font-bold">Cambodian</p></div>
                  </div>
                </section>

                <section>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-3">Languages</h3>
                  <div className="space-y-2 text-[10px]">
                    <div><p className="text-slate-400">Khmer</p><p className="font-bold">Native</p></div>
                    <div><p className="text-slate-400">English</p><p className="font-bold">Intermediate</p></div>
                    <div><p className="text-slate-400">Chinese</p><p className="font-bold">HSK 3</p></div>
                  </div>
                </section>

                <section>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-3">Interests</h3>
                  <div className="space-y-2 text-[10px]">
                    <p className="font-bold">Digital Marketing</p>
                    <p className="font-bold">Content Creation</p>
                    <p className="font-bold">Event Planning</p>
                  </div>
                </section>
              </div>

              <div className="col-span-2 space-y-6">
                <section>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-3">Education</h3>
                  <div className="space-y-4">
                    <div className="relative pl-4 border-l-2 border-slate-100">
                      <div className="absolute -left-[5px] top-0 h-2 w-2 rounded-full bg-indigo-600" />
                      <p className="text-[10px] font-bold text-indigo-600">2024 - Present</p>
                      <h4 className="text-xs font-bold">Bachelor of Business Administration</h4>
                      <p className="text-[10px] text-slate-500">Build Bright University (BBU-SR)</p>
                      <p className="text-[10px] mt-1 italic text-slate-400">Major: Marketing</p>
                    </div>
                    <div className="relative pl-4 border-l-2 border-slate-100">
                      <div className="absolute -left-[5px] top-0 h-2 w-2 rounded-full bg-slate-300" />
                      <p className="text-[10px] font-bold text-slate-400">2018 - 2024</p>
                      <h4 className="text-xs font-bold">High School Diploma</h4>
                      <p className="text-[10px] text-slate-500">Angkor High School</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-3">Objective</h3>
                  <p className="text-[10px] text-slate-600 leading-relaxed">
                    A motivated Marketing student at Build Bright University seeking an internship opportunity to apply my theoretical knowledge in digital marketing, content creation, and communication to real-world business challenges.
                  </p>
                </section>
                
                <div className="mt-12 pt-4 border-t border-slate-100 text-center">
                  <p className="text-[8px] text-slate-300 uppercase tracking-[0.2em]">Generated via InternHub</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
