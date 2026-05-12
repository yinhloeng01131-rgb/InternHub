import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, DollarSign, User, Mail, Phone, GraduationCap, Briefcase, Upload, FileText } from 'lucide-react';
import { Button, Card } from './UI';
import { UserProfile, Internship } from '../types';

interface ApplicationFormProps {
  user: UserProfile;
  internship: Internship;
  onClose: () => void;
  lang: 'en' | 'km';
  t: (key: any, params?: any) => string;
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({ user, internship, onClose, lang, t }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [message, setMessage] = useState('');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-md">
      <AnimatePresence mode="wait">
        {step === 'form' ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="w-full max-w-lg overflow-hidden rounded-[32px] bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <h3 className="text-lg font-bold text-slate-900">{t('applicationForm')}</h3>
              <button onClick={onClose} className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto no-scrollbar">
              <div className="rounded-2xl bg-indigo-50 p-4 border border-indigo-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="rounded-lg bg-indigo-600 p-1.5 text-white">
                    <Briefcase size={16} />
                  </div>
                  <p className="text-sm font-bold text-slate-900">{internship.title}</p>
                </div>
                <p className="text-xs text-indigo-600 font-medium">{internship.companyName}</p>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">{t('confirmDetails')}</h4>
                
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
                    <User size={18} className="text-slate-400" />
                    <div className="flex-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Name</p>
                      <p className="text-sm font-bold text-slate-700">{user.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
                    <Mail size={18} className="text-slate-400" />
                    <div className="flex-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Email</p>
                      <p className="text-sm font-bold text-slate-700">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
                    <GraduationCap size={18} className="text-slate-400" />
                    <div className="flex-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Major</p>
                      <p className="text-sm font-bold text-slate-700">{user.major}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">{t('uploadCV')}</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 transition-all hover:border-indigo-300 hover:bg-indigo-50/30"
                >
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    className="hidden" 
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                  />
                  {cvFile ? (
                    <div className="flex items-center gap-2 text-indigo-600">
                      <FileText size={24} />
                      <p className="text-sm font-bold">{cvFile.name}</p>
                    </div>
                  ) : (
                    <>
                      <Upload className="text-slate-400" size={24} />
                      <p className="text-xs text-slate-500">{t('uploadCV')}</p>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">{t('whyFit')}</label>
                <textarea 
                  required
                  className="w-full min-h-[120px] rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm focus:border-indigo-500 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="Tell the company why they should hire you..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="flex-1 rounded-2xl" onClick={onClose} type="button">
                  {t('cancel')}
                </Button>
                <Button className="flex-[2] rounded-2xl shadow-lg shadow-indigo-100" type="submit">
                  {t('submitApplication')}
                </Button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm rounded-[32px] bg-white p-8 text-center shadow-2xl"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 size={48} />
            </div>
            <h3 className="mb-2 text-xl font-black text-slate-900">{t('applicationSuccess')}</h3>
            <p className="mb-8 text-sm text-slate-500 leading-relaxed">
              {t('applicationSuccessDesc')}
            </p>
            <Button className="w-full rounded-2xl" onClick={onClose}>
              Done
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
