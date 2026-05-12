import React from 'react';
import { motion } from 'motion/react';
import { X, MapPin, Clock, Calendar, MessageSquare, ArrowRight, Check, Ban } from 'lucide-react';
import { Internship, Application } from '../types';
import { Language } from '../translations';
import { Button, Badge, cn } from './UI';

export const InternshipDetails: React.FC<{ internship: Internship, onClose: () => void, onChat: () => void, onApply: () => void, lang: Language }> = ({ internship, onClose, onChat, onApply, lang }) => {
  const t = (key: string) => key; // Simplified for now, use actual translations if needed

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 backdrop-blur-sm sm:items-center p-0 sm:p-4">
      <motion.div 
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        className="w-full max-w-lg rounded-t-[32px] bg-white p-6 shadow-2xl sm:rounded-[32px] overflow-hidden flex flex-col max-h-[90vh] text-slate-900"
      >
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-4">
            <img src={internship.companyLogo} alt={internship.companyName} className="h-16 w-16 rounded-2xl object-cover border border-slate-100 shadow-sm" />
            <div>
              <h3 className="text-xl font-bold">{internship.title}</h3>
              <p className="text-indigo-600 font-medium">{internship.companyName}</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200">
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="rounded-2xl bg-slate-50 p-3 text-center">
            <MapPin size={18} className="mx-auto mb-1 text-indigo-600" />
            <p className="text-[10px] font-bold text-slate-400 uppercase">Location</p>
            <p className="text-xs font-bold text-slate-700">{internship.location}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-3 text-center">
            <Clock size={18} className="mx-auto mb-1 text-indigo-600" />
            <p className="text-[10px] font-bold text-slate-400 uppercase">Duration</p>
            <p className="text-xs font-bold text-slate-700">{internship.duration}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-3 text-center">
            <Calendar size={18} className="mx-auto mb-1 text-indigo-600" />
            <p className="text-[10px] font-bold text-slate-400 uppercase">Deadline</p>
            <p className="text-xs font-bold text-slate-700">{internship.deadline}</p>
          </div>
        </div>

        <div className="space-y-6 mb-8 overflow-y-auto pr-2 no-scrollbar flex-1">
          <section>
            <h4 className="font-bold mb-2">About Company</h4>
            <p className="text-sm text-slate-600 leading-relaxed">{internship.companyDescription}</p>
          </section>

          <section>
            <h4 className="font-bold mb-2">Role Description</h4>
            <p className="text-sm text-slate-600 leading-relaxed">{internship.description}</p>
          </section>

          <section>
            <h4 className="font-bold mb-2">Benefits</h4>
            <div className="grid grid-cols-2 gap-2">
              {internship.benefits.map((benefit, idx) => (
                <div key={`${benefit}-${idx}`} className="flex items-center gap-2 text-xs text-slate-600">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {benefit}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h4 className="font-bold mb-2">Required Skills</h4>
            <div className="flex flex-wrap gap-2">
              {internship.requirements.map((req, idx) => (
                <Badge key={`${req}-${idx}`} variant="info">{req}</Badge>
              ))}
            </div>
          </section>
        </div>

        <div className="flex gap-3 pt-4 border-t border-slate-100">
          <Button variant="outline" className="flex-1 gap-2" onClick={onChat}>
            <MessageSquare size={18} /> Chat
          </Button>
          <Button className="flex-[2] gap-2" onClick={onApply}>
            Apply Now <ArrowRight size={18} />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export const ApplicationDetailModal: React.FC<{ application: Application, onClose: () => void, lang: Language, t: any, onStatusUpdate: (id: string, status: 'shortlisted' | 'rejected') => void }> = ({ application, onClose, lang, t, onStatusUpdate }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-lg overflow-hidden rounded-[32px] bg-white p-8 shadow-2xl relative"
      >
        <button onClick={onClose} className="absolute right-6 top-6 rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200 transition-colors">
          <X size={20} />
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div className="h-20 w-20 rounded-2xl bg-slate-100 overflow-hidden shadow-inner">
            <img src={application.studentPhoto || ''} alt={application.studentName} className="h-full w-full object-cover" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">{application.studentName}</h2>
            <Badge variant={application.status === 'pending' ? 'warning' : application.status === 'shortlisted' ? 'success' : 'info'} className="mt-2 text-[10px]">
              {t(application.status as any)}
            </Badge>
          </div>
        </div>

        <div className="space-y-6">
          <section>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{lang === 'en' ? 'Education' : 'ការអប់រំ'}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-white border border-slate-100 text-slate-900">
                <p className="text-[8px] font-bold text-slate-400 uppercase">{lang === 'en' ? 'University' : 'សាកលវិទ្យាល័យ'}</p>
                <p className="text-xs font-bold">{application.studentMajor === 'Marketing' ? 'RUPP' : 'Build Bright University'}</p>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-100 text-slate-900">
                <p className="text-[8px] font-bold text-slate-400 uppercase">{lang === 'en' ? 'Year' : 'ឆ្នាំ'}</p>
                <p className="text-xs font-bold">Year 3</p>
              </div>
            </div>
          </section>

          <div className="flex gap-3 pt-4">
            <Button 
              className={cn(
                "flex-1 font-bold rounded-xl h-12 shadow-lg transition-all",
                application.status === 'shortlisted' ? "bg-emerald-700 shadow-emerald-200" : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100"
              )}
              onClick={() => {
                onStatusUpdate(application.id, 'shortlisted');
                onClose();
              }}
            >
              <Check size={18} className="mr-2" /> {t('shortlistCandidate')}
            </Button>
            <Button 
              variant="outline" 
              className={cn(
                "flex-1 font-bold rounded-xl h-12 transition-all",
                application.status === 'rejected' ? "bg-rose-50 border-rose-600 text-rose-600" : "border-rose-200 text-rose-600 hover:bg-rose-50"
              )}
              onClick={() => {
                onStatusUpdate(application.id, 'rejected');
                onClose();
              }}
            >
              <Ban size={18} className="mr-2" /> {t('rejectCandidate')}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
