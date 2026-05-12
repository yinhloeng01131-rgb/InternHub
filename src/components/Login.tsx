import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Mail, 
  Lock, 
  MapPin, 
  Phone, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck,
  Briefcase
} from 'lucide-react';
import { Button, Card, cn } from './UI';
import { UserProfile } from '../types';

interface LoginProps {
  onLogin: (userData: Partial<UserProfile>) => void;
  lang: 'en' | 'km';
}

import { MOCK_USER } from '../data/mockData';

export const Login: React.FC<LoginProps> = ({ onLogin, lang }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    identifier: '', // username, email, or phone
    password: '',
    name: '',
    address: '',
    phone: '',
    email: '',
    major: '',
    university: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // If signing in, try to match with MOCK_USER for a better experience
    let finalName = formData.name;
    let finalEmail = formData.email;
    let finalPhone = formData.phone;
    let finalAddress = formData.address;
    let finalMajor = formData.major;
    let finalUniversity = formData.university;

    if (!isRegistering) {
      if (formData.identifier === MOCK_USER.email || formData.identifier === MOCK_USER.phone) {
        // Still allow MOCK_USER for demo purposes if they use the exact mock credentials
        finalName = MOCK_USER.name;
        finalEmail = MOCK_USER.email;
        finalPhone = MOCK_USER.phone;
        finalAddress = MOCK_USER.address;
        finalMajor = MOCK_USER.major;
        finalUniversity = MOCK_USER.university;
      } else {
        // For any other student, only fill what they used to login
        finalName = formData.identifier.split('@')[0] || 'Student';
        finalEmail = formData.identifier.includes('@') ? formData.identifier : '';
        finalPhone = !formData.identifier.includes('@') && !isNaN(Number(formData.identifier.replace(/\s/g, ''))) ? formData.identifier : '';
        finalAddress = '';
        finalMajor = '';
        finalUniversity = '';
      }
    }

    onLogin({
      name: finalName,
      email: finalEmail,
      phone: finalPhone,
      address: finalAddress,
      major: finalMajor,
      university: finalUniversity,
      age: isRegistering ? 0 : (formData.identifier === MOCK_USER.email || formData.identifier === MOCK_USER.phone ? MOCK_USER.age : 0),
      gender: isRegistering ? 'Other' : (formData.identifier === MOCK_USER.email || formData.identifier === MOCK_USER.phone ? MOCK_USER.gender : 'Other'),
      interests: isRegistering ? [] : (formData.identifier === MOCK_USER.email || formData.identifier === MOCK_USER.phone ? MOCK_USER.interests : []),
    });
  };

  const t = (en: string, km: string) => lang === 'en' ? en : km;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-200 mb-4">
            <Briefcase size={32} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">InternHub</h1>
          <p className="text-slate-500 mt-2 font-medium">
            Welcome (សូមស្វាគមន៍)
          </p>
        </div>

        <Card className="p-8 border-none shadow-2xl shadow-slate-200/50 rounded-[32px]">
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isRegistering ? (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                    Email, Phone or Username (អ៊ីមែល លេខទូរស័ព្ទ ឬឈ្មោះអ្នកប្រើ)
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      required
                      placeholder={t("Enter your identifier", "បញ្ចូលអត្តសញ្ញាណរបស់អ្នក")}
                      className="w-full rounded-2xl border-slate-100 bg-slate-50 py-4 pl-12 pr-4 text-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all outline-none border"
                      value={formData.identifier}
                      onChange={e => setFormData({...formData, identifier: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                    Password (ពាក្យសម្ងាត់)
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="password" 
                      required
                      placeholder="••••••••"
                      className="w-full rounded-2xl border-slate-100 bg-slate-50 py-4 pl-12 pr-4 text-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all outline-none border"
                      value={formData.password}
                      onChange={e => setFormData({...formData, password: e.target.value})}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                    {t("Full Name", "ឈ្មោះពេញ")}
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      required
                      placeholder={t("Enter your full name", "បញ្ចូលឈ្មោះពេញរបស់អ្នក")}
                      className="w-full rounded-2xl border-slate-100 bg-slate-50 py-4 pl-12 pr-4 text-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all outline-none border"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                    {t("Email or Phone", "អ៊ីមែល ឬលេខទូរស័ព្ទ")}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      required
                      placeholder={t("Enter email or phone", "បញ្ចូលអ៊ីមែល ឬលេខទូរស័ព្ទ")}
                      className="w-full rounded-2xl border-slate-100 bg-slate-50 py-4 pl-12 pr-4 text-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all outline-none border"
                      value={formData.identifier}
                      onChange={e => setFormData({...formData, identifier: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                    {t("Address", "អាសយដ្ឋាន")}
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      required
                      placeholder={t("Enter your address", "បញ្ចូលអាសយដ្ឋានរបស់អ្នក")}
                      className="w-full rounded-2xl border-slate-100 bg-slate-50 py-4 pl-12 pr-4 text-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all outline-none border"
                      value={formData.address}
                      onChange={e => setFormData({...formData, address: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                    {t("Create Password", "បង្កើតពាក្យសម្ងាត់")}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="password" 
                      required
                      placeholder="••••••••"
                      className="w-full rounded-2xl border-slate-100 bg-slate-50 py-4 pl-12 pr-4 text-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all outline-none border"
                      value={formData.password}
                      onChange={e => setFormData({...formData, password: e.target.value})}
                    />
                  </div>
                </div>
              </>
            )}

            <Button type="submit" className="w-full py-6 rounded-2xl text-base font-bold shadow-lg shadow-indigo-100">
              {isRegistering ? t("Create Account", "បង្កើតគណនី") : t("Sign In", "ចូលប្រើ")}
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-sm font-bold text-indigo-600 hover:text-indigo-700"
            >
              {isRegistering 
                ? t("Already have an account? Sign In", "មានគណនីរួចហើយ? ចូលប្រើ") 
                : t("Don't have an account? Create one", "មិនទាន់មានគណនី? បង្កើតថ្មី")}
            </button>
          </div>
        </Card>

      </motion.div>
    </div>
  );
};
