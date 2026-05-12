import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { X, User, Briefcase, GraduationCap, MapPin, Phone, Mail, Calendar, Users, Camera, Trash2 } from 'lucide-react';
import { Button, Card } from './UI';
import { UserProfile } from '../types';

interface EditProfileProps {
  user: UserProfile;
  onSave: (updatedUser: Partial<UserProfile>) => void;
  onClose: () => void;
  lang: 'en' | 'km';
  t: (key: any) => string;
}

export const EditProfile: React.FC<EditProfileProps> = ({ user, onSave, onClose, lang, t }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    major: user.major,
    university: user.university,
    age: user.age,
    gender: user.gender,
    address: user.address,
    phone: user.phone,
    email: user.email,
    photoURL: user.photoURL || '',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photoURL: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setFormData(prev => ({ ...prev, photoURL: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[32px] bg-white p-0 shadow-2xl no-scrollbar"
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4 z-10">
          <h3 className="text-lg font-bold">{t('editProfile')}</h3>
          <button onClick={onClose} className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="relative group">
              <div className="h-24 w-24 rounded-3xl bg-slate-100 overflow-hidden border-2 border-slate-100 shadow-inner flex items-center justify-center">
                {formData.photoURL ? (
                  <img 
                    src={formData.photoURL} 
                    alt="Profile" 
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <User size={40} className="text-slate-300" />
                )}
              </div>
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-2 rounded-xl shadow-lg hover:bg-indigo-700 transition-colors"
              >
                <Camera size={16} />
              </button>
              {formData.photoURL && (
                <button 
                  type="button"
                  onClick={removePhoto}
                  className="absolute -top-2 -right-2 bg-rose-500 text-white p-1.5 rounded-lg shadow-lg hover:bg-rose-600 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={12} />
                </button>
              )}
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Profile Photo</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  className="w-full rounded-2xl border-slate-100 bg-slate-50 py-3 pl-11 pr-4 text-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all outline-none border"
                  value={formData.name}
                  onChange={e => setFormData(prev => ({...prev, name: e.target.value}))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Major</label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text" 
                    className="w-full rounded-2xl border-slate-100 bg-slate-50 py-3 pl-11 pr-4 text-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all outline-none border"
                    value={formData.major}
                    onChange={e => setFormData(prev => ({...prev, major: e.target.value}))}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">University</label>
                <div className="relative">
                  <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text" 
                    className="w-full rounded-2xl border-slate-100 bg-slate-50 py-3 pl-11 pr-4 text-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all outline-none border"
                    value={formData.university}
                    onChange={e => setFormData(prev => ({...prev, university: e.target.value}))}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Age</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="number" 
                    className="w-full rounded-2xl border-slate-100 bg-slate-50 py-3 pl-11 pr-4 text-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all outline-none border"
                    value={formData.age}
                    onChange={e => setFormData(prev => ({...prev, age: parseInt(e.target.value) || 0}))}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Gender</label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <select 
                    className="w-full rounded-2xl border-slate-100 bg-slate-50 py-3 pl-11 pr-4 text-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all outline-none border appearance-none"
                    value={formData.gender}
                    onChange={e => setFormData(prev => ({...prev, gender: e.target.value}))}
                  >
                    <option value="" disabled>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Address</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  className="w-full rounded-2xl border-slate-100 bg-slate-50 py-3 pl-11 pr-4 text-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all outline-none border"
                  value={formData.address}
                  onChange={e => setFormData(prev => ({...prev, address: e.target.value}))}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="tel" 
                  className="w-full rounded-2xl border-slate-100 bg-slate-50 py-3 pl-11 pr-4 text-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all outline-none border"
                  value={formData.phone}
                  onChange={e => setFormData(prev => ({...prev, phone: e.target.value}))}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="email" 
                  className="w-full rounded-2xl border-slate-100 bg-slate-50 py-3 pl-11 pr-4 text-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all outline-none border"
                  value={formData.email}
                  onChange={e => setFormData(prev => ({...prev, email: e.target.value}))}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1 rounded-2xl" onClick={onClose} type="button">
              {t('cancel')}
            </Button>
            <Button className="flex-1 rounded-2xl shadow-lg shadow-indigo-100" type="submit">
              {t('saveChanges')}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
