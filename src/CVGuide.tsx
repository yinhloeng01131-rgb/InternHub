import React from 'react';
import { motion } from 'motion/react';
import { X, CheckCircle, Lightbulb, FileText, AlertCircle } from 'lucide-react';
import { Card, Button, Badge } from './components/UI';

export const CVGuide: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const tips = [
    { title: "Keep it Concise", desc: "For students, a 1-page resume is usually sufficient. Focus on quality over quantity.", icon: <FileText className="text-indigo-600" /> },
    { title: "Quantify Achievements", desc: "Instead of 'Helped with marketing', use 'Increased social media engagement by 20%'.", icon: <CheckCircle className="text-emerald-600" /> },
    { title: "Tailor for the Role", desc: "Highlight skills and projects that directly relate to the internship description.", icon: <Lightbulb className="text-amber-600" /> },
    { title: "Professional Formatting", desc: "Use a clean, readable font and consistent spacing. PDF is the standard format.", icon: <AlertCircle className="text-rose-600" /> },
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
          <h3 className="text-lg font-bold">How to Write a Good CV</h3>
          <button onClick={onClose} className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="rounded-2xl bg-indigo-50 p-6 border border-indigo-100">
            <p className="text-sm text-indigo-700 leading-relaxed">
              Your CV is your first impression. For college students, focusing on **projects**, **interests**, and **relevant coursework** is key to standing out without years of experience.
            </p>
          </div>

          <div className="space-y-4">
            {tips.map((tip, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0 mt-1">{tip.icon}</div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{tip.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <section>
            <h4 className="mb-3 font-bold text-slate-900">Essential Sections</h4>
            <div className="flex flex-wrap gap-2">
              <Badge>Contact Info</Badge>
              <Badge>Education</Badge>
              <Badge>Career Goals</Badge>
              <Badge>Projects</Badge>
              <Badge>Experience</Badge>
              <Badge>Certifications</Badge>
            </div>
          </section>

          <Card className="bg-slate-50 border-dashed border-2 border-slate-200 text-center py-8">
            <FileText className="mx-auto mb-2 text-slate-400" size={32} />
            <p className="text-sm font-bold text-slate-600">Need a template?</p>
            <p className="text-xs text-slate-400 mb-4">Use our built-in Resume Builder to get started!</p>
            <Button size="sm" onClick={onClose}>Open Resume Builder</Button>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};
