import React from 'react';
import { UserProfile } from '../types';
import { Card, Button, Badge } from './UI';
import { Download, Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

export function ResumePreview({ user, onClose }: { user: UserProfile, onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <Card className="max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-white p-0 shadow-2xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4">
          <h3 className="text-lg font-bold">Resume Preview</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Download size={16} /> PDF
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>Close</Button>
          </div>
        </div>

        <div className="p-8 space-y-8 text-slate-800">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-900">{user.name}</h1>
            <p className="text-indigo-600 font-medium">{user.major} Student</p>
            <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-1"><Mail size={12} /> alex.j@university.edu</div>
              <div className="flex items-center gap-1"><Phone size={12} /> +1 (555) 000-0000</div>
              <div className="flex items-center gap-1"><MapPin size={12} /> San Francisco, CA</div>
            </div>
          </div>

          {/* Summary */}
          <section>
            <h4 className="mb-2 border-b border-slate-200 pb-1 text-sm font-bold uppercase tracking-wider text-slate-900">Professional Summary</h4>
            <p className="text-sm leading-relaxed text-slate-600">
              Motivated {user.major} student with a strong foundation in {user.interests.join(', ')}. 
              Passionate about building user-centric solutions and continuously developing professionally through practical projects and courses.
            </p>
          </section>

          {/* Experience */}
          <section>
            <h4 className="mb-4 border-b border-slate-200 pb-1 text-sm font-bold uppercase tracking-wider text-slate-900">Experience & Projects</h4>
            <div className="space-y-4">
              <div className="relative pl-4 before:absolute before:left-0 before:top-1.5 before:h-2 before:w-2 before:rounded-full before:bg-indigo-600">
                <div className="flex justify-between">
                  <h5 className="font-bold text-slate-900 text-sm">Personal Portfolio Website</h5>
                  <span className="text-xs text-slate-500">2025</span>
                </div>
                <p className="text-xs text-slate-600 mt-1">Built a responsive portfolio using React and Tailwind CSS to showcase projects and accomplishments.</p>
              </div>
              <div className="relative pl-4 before:absolute before:left-0 before:top-1.5 before:h-2 before:w-2 before:rounded-full before:bg-indigo-600">
                <div className="flex justify-between">
                  <h5 className="font-bold text-slate-900 text-sm">Task Management App</h5>
                  <span className="text-xs text-slate-500">2024</span>
                </div>
                <p className="text-xs text-slate-600 mt-1">Developed a full-stack task tracker with user authentication and real-time updates.</p>
              </div>
            </div>
          </section>

          {/* Achievements */}
          <section>
            <h4 className="mb-3 border-b border-slate-200 pb-1 text-sm font-bold uppercase tracking-wider text-slate-900">Achievements</h4>
            <div className="grid grid-cols-2 gap-3">
              {user.badges.filter(b => b.unlocked).map(badge => (
                <div key={badge.id} className="flex items-center gap-2 rounded-lg bg-slate-50 p-2 border border-slate-100">
                  <span className="text-lg">{badge.icon}</span>
                  <div>
                    <p className="text-[10px] font-bold text-slate-900">{badge.name}</p>
                    <p className="text-[8px] text-slate-500 line-clamp-1">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Social */}
          <div className="flex justify-center gap-6 border-t border-slate-100 pt-6">
            <Linkedin size={20} className="text-slate-400 hover:text-indigo-600 cursor-pointer" />
            <Globe size={20} className="text-slate-400 hover:text-indigo-600 cursor-pointer" />
          </div>
        </div>
      </Card>
    </div>
  );
}
