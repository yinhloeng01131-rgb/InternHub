import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Briefcase, 
  User, 
  Search, 
  Bell, 
  Trophy, 
  ChevronRight, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  FileText, 
  Star,
  ArrowRight,
  Award,
  X,
  Globe,
  Linkedin,
  Users,
  Calendar,
  MessageSquare,
  Heart,
  HelpCircle,
  Languages,
  Info,
  BookOpen,
  Phone,
  Mail,
  MapPinned,
  TrendingUp,
  Plus,
  Eye,
  Check,
  Ban
} from 'lucide-react';
import { MOCK_INTERNSHIPS, MOCK_USER, MOCK_CHATS, MOCK_NOTIFICATIONS, BLANK_USER, MOCK_APPLICATIONS, MOCK_EMPLOYER } from './data/mockData';
import { Internship, UserProfile, ChatSession, Notification, Message, Application, EmployerProfile } from './types';
import { Button, Card, Badge, ProgressBar, cn } from './components/UI';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { ResumePreview } from './components/ResumeBuilder';
import { ChatWindow, ChatList } from './components/Chat';
import { CVGuide } from './CVGuide';
import { HowToUse, CVSample } from './components/Guides';
import { translations, Language } from './translations';
import { Login } from './components/Login';
import { EditProfile } from './components/EditProfile';
import { ApplicationForm } from './components/ApplicationForm';
import { Notifications } from './components/Notifications';
import { InternshipDetails, ApplicationDetailModal } from './components/Modals';
import { AIChatbot } from './components/AIChatbot';
import { JobAdvertisingBoard } from './components/JobAdvertisingBoard';
import { Bot, Sparkles } from 'lucide-react';

type Page = 'dashboard' | 'internships' | 'messages' | 'profile' | 'employer-dashboard' | 'employer-applications' | 'employer-post' | 'employer-profile';

export default function App() {
  const [activePage, setActivePage] = useState<Page>('dashboard');
  const [user, setUser] = useState<UserProfile>(BLANK_USER);
  const [internships] = useState<Internship[]>(MOCK_INTERNSHIPS);
  const [apps, setApps] = useState<Application[]>(MOCK_APPLICATIONS);
  const [chats, setChats] = useState<ChatSession[]>(MOCK_CHATS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAIChatbot, setShowAIChatbot] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [showCVGuide, setShowCVGuide] = useState(false);
  const [showHowToUse, setShowHowToUse] = useState(false);
  const [showCVSample, setShowCVSample] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showAboutUs, setShowAboutUs] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [activeChat, setActiveChat] = useState<ChatSession | null>(null);
  const [lang, setLang] = useState<Language>('en');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showEditEmployerProfile, setShowEditEmployerProfile] = useState(false);
  const [employer, setEmployer] = useState<EmployerProfile>(MOCK_EMPLOYER);

  const t = (key: keyof typeof translations.en, params?: Record<string, any>) => {
    let text = (translations[lang] as any)[key] || translations.en[key] || key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, String(v));
      });
    }
    return text;
  };

  const startChat = (internship: Internship) => {
    setChats(prev => {
      const existingChat = prev.find(c => c.companyId === internship.id);
      if (existingChat) {
        setActiveChat(existingChat);
        return prev;
      } else {
        const newChat: ChatSession = {
          companyId: internship.id,
          companyName: internship.companyName,
          companyLogo: internship.companyLogo,
          lastMessage: 'Starting a new conversation...',
          messages: [],
        };
        setActiveChat(newChat);
        return [newChat, ...prev];
      }
    });
    setSelectedInternship(null);
  };

  const handleLogin = (userData: Partial<UserProfile>) => {
    setUser({ ...BLANK_USER, ...userData });
    setIsLoggedIn(true);
  };

  const handleUpdateEmployer = (data: Partial<EmployerProfile>) => {
    setEmployer(prev => ({ ...prev, ...data }));
    setShowEditEmployerProfile(false);
  };

  const handleUpdateAppStatus = (id: string, status: 'shortlisted' | 'rejected') => {
    setApps(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleSendMessage = (sessionId: string, message: Message) => {
    setChats(prev => {
      const updatedChats = prev.map(chat => {
        if (chat.companyId === sessionId) {
          const updatedChat = {
            ...chat,
            messages: [...chat.messages, message],
            lastMessage: message.text,
            lastMessageTime: message.timestamp
          };
          // Update activeChat if it's the one being modified
          setActiveChat(prevActive => prevActive?.companyId === sessionId ? updatedChat : prevActive);
          return updatedChat;
        }
        return chat;
      });
      return updatedChats;
    });
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} lang={lang} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-rose-100 pb-24 text-slate-900 relative overflow-x-hidden">
      {/* Background Decorative Blobs */}
      <div className="fixed -top-24 -left-24 h-96 w-96 rounded-full bg-indigo-200/30 blur-3xl pointer-events-none" />
      <div className="fixed top-1/2 -right-24 h-96 w-96 rounded-full bg-rose-200/30 blur-3xl pointer-events-none" />
      <div className="fixed -bottom-24 left-1/4 h-96 w-96 rounded-full bg-purple-200/30 blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/70 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-lg items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-200">IH</div>
            <div className="flex flex-col">
              <h1 className="text-sm font-bold tracking-tight text-indigo-900 leading-none">{t('appName' as any)}</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowNotifications(true)}
              className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100"
            >
              <Bell size={20} />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => setLang(lang === 'en' ? 'km' : 'en')}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
            >
              <Languages size={18} />
            </button>
            <button 
              onClick={() => setActivePage('profile')}
              className={cn(
                "h-9 w-9 rounded-full border-2 p-0.5 transition-all flex items-center justify-center overflow-hidden",
                activePage === 'profile' ? "border-indigo-600" : "border-transparent",
                !user.photoURL && "bg-slate-100"
              )}
            >
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt="Profile" 
                  className="h-full w-full rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <User size={18} className="text-slate-400" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-lg px-4 py-6">
        <AnimatePresence mode="wait">
          {activePage === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6 relative z-10"
            >
              {/* App Poster/Hero */}
              <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-indigo-600 to-purple-700 p-6 text-white shadow-2xl shadow-indigo-200">
                <div className="relative z-10">
                  <Badge variant="outline" className="mb-3 border-white/30 bg-white/10 text-white backdrop-blur-sm">
                    {t('appName' as any)}
                  </Badge>
                  <h2 className="text-3xl font-black leading-tight tracking-tight drop-shadow-sm">
                    {lang === 'en' ? 'Bridge the Gap to Your Future' : 'បំពេញចន្លោះសម្រាប់អនាគតរបស់អ្នក'}
                  </h2>
                  <p className="mt-2 text-sm text-indigo-100 opacity-90 leading-relaxed">
                    {t('aboutUsDesc' as any)}
                  </p>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-8 w-8 rounded-full border-2 border-indigo-600 bg-indigo-400 flex items-center justify-center text-[10px] font-bold shadow-sm">
                          {String.fromCharCode(64 + i)}
                        </div>
                      ))}
                    </div>
                    <span className="text-xs font-medium text-indigo-100">+500 Students Joined</span>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/20 blur-3xl animate-pulse" />
                <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-indigo-400/30 blur-3xl" />
                <Sparkles className="absolute bottom-6 right-6 text-white/30 animate-bounce" size={48} />
              </section>

              <section>
                <div className="mb-4 group relative">
                  <h2 className="text-2xl font-bold text-slate-900">{t('welcome', { name: user.name })}</h2>
                  <div className="flex items-center gap-1">
                    <p className="text-sm text-slate-500">{t('ready')}</p>
                    <div className="group relative cursor-help">
                      <Info size={14} className="text-slate-400" />
                      <div className="absolute left-0 top-full mt-2 w-64 rounded-xl bg-slate-800 p-3 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none z-50 shadow-xl">
                        {t('readyDesc' as any)}
                        <div className="absolute bottom-full left-4 border-8 border-transparent border-b-slate-800" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <JobAdvertisingBoard lang={lang} />
                </div>
              </section>

              <section>
                <h3 className="mb-3 font-bold text-slate-900">{t('quickActions')}</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setActivePage('internships')}
                    className="flex flex-col items-center justify-center rounded-2xl bg-white p-4 border border-slate-100 shadow-sm hover:border-indigo-200 transition-colors"
                  >
                    <div className="mb-2 rounded-xl bg-indigo-50 p-2 text-indigo-600">
                      <Briefcase size={20} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-700 text-center">{t('findInternships')}</span>
                  </button>
                  <button 
                    onClick={() => setShowAIChatbot(true)}
                    className="flex flex-col items-center justify-center rounded-2xl bg-indigo-600 p-4 border border-indigo-500 shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-colors group"
                  >
                    <div className="mb-2 rounded-xl bg-white/20 p-2 text-white group-hover:scale-110 transition-transform">
                      <Bot size={20} />
                    </div>
                    <span className="text-[10px] font-bold text-white text-center">{lang === 'en' ? 'Career AI' : 'ជំនួយការ AI'}</span>
                  </button>
                </div>
              </section>

              <section>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-bold text-slate-900">{t('topMatches')}</h3>
                  <button onClick={() => setActivePage('internships')} className="text-xs font-semibold text-indigo-600 hover:underline">{t('seeAll')}</button>
                </div>
                <div className="space-y-3">
                  {internships.slice(0, 2).map(internship => (
                    <InternshipCard 
                      key={internship.id} 
                      internship={internship} 
                      onClick={() => setSelectedInternship(internship)}
                      onApply={(e) => {
                        e.stopPropagation();
                        setSelectedInternship(internship);
                        setShowApplicationForm(true);
                      }}
                      lang={lang}
                    />
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {activePage === 'internships' && (
            <motion.div
              key="internships"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder={t('searchPlaceholder')}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {[
                  'All', 
                  'General Management', 
                  'Accounting and Finance', 
                  'Finance and Banking', 
                  'Marketing', 
                  'International Business', 
                  'Agricultural Production and Marketing', 
                  'Law', 
                  'Tourism and Hospitality Management', 
                  'Information Technology (IT)', 
                  'Digital Media Design (DMD)', 
                  'Building Civil Engineering', 
                  'Architecture and Urban Planning', 
                  'Teaching English as a Foreign Language'
                ].map(cat => (
                  <button 
                    key={cat} 
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "whitespace-nowrap rounded-full border px-4 py-1.5 text-xs font-medium transition-all",
                      selectedCategory === cat 
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-100" 
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    {t(cat.toLowerCase().replace(/[\s()]/g, '') as any) || cat}
                  </button>
                ))}
              </div>

              {selectedCategory === 'All' && searchQuery === '' && (
                <section>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-bold text-slate-900">{t('recommendedForYou' as any)}</h3>
                    <Badge variant="info" className="text-[10px]">{user.major}</Badge>
                  </div>
                  <div className="space-y-4">
                    {internships
                      .filter(i => i.category === user.major || i.matchScore > 85)
                      .slice(0, 3)
                      .map(internship => (
                        <InternshipCard 
                          key={`rec-${internship.id}`} 
                          internship={internship} 
                          onClick={() => setSelectedInternship(internship)}
                          onApply={(e) => {
                            e.stopPropagation();
                            setSelectedInternship(internship);
                            setShowApplicationForm(true);
                          }}
                          lang={lang}
                        />
                      ))}
                  </div>
                  <div className="mt-6 border-t border-slate-100 pt-6">
                    <h3 className="mb-3 font-bold text-slate-900">{t('allInternships' as any)}</h3>
                  </div>
                </section>
              )}

              <div className="space-y-4">
                {internships
                  .filter(i => {
                    const matchesSearch = i.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                        i.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                        i.category.toLowerCase().includes(searchQuery.toLowerCase());
                    const matchesCategory = selectedCategory === 'All' || i.category === selectedCategory;
                    return matchesSearch && matchesCategory;
                  })
                  .map(internship => (
                    <InternshipCard 
                      key={internship.id} 
                      internship={internship} 
                      onClick={() => setSelectedInternship(internship)}
                      onApply={(e) => {
                        e.stopPropagation();
                        setSelectedInternship(internship);
                        setShowApplicationForm(true);
                      }}
                      lang={lang}
                    />
                  ))}
              </div>
            </motion.div>
          )}

          {activePage === 'messages' && (
            <motion.div
              key="messages"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold">Messages</h2>
                <Badge variant="success">{chats.length} Chats</Badge>
              </div>
              <ChatList sessions={chats} onSelect={setActiveChat} />
            </motion.div>
          )}

          {activePage === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex flex-col items-center py-6">
                <div className="relative mb-6">
                  <div className="h-32 w-32 rounded-3xl bg-white p-1 shadow-xl ring-1 ring-slate-100 rotate-3 flex items-center justify-center overflow-hidden">
                      {user.photoURL ? (
                        <img 
                          src={user.photoURL} 
                          alt="Avatar" 
                          className="h-full w-full rounded-2xl object-cover -rotate-3" 
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <User size={48} className="text-slate-300 -rotate-3" />
                      )}
                  </div>
                </div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">{user.name || 'Student'}</h2>
                <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest mt-1">{user.major || (lang === 'en' ? 'Set your major' : 'កំណត់ជំនាញរបស់អ្នក')}</p>
                <p className="text-xs text-slate-400 mt-1">{user.university || (lang === 'en' ? 'Set your university' : 'កំណត់សាកលវិទ្យាល័យរបស់អ្នក')}</p>

                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-4 rounded-xl text-[10px] font-black uppercase tracking-widest border-indigo-100 text-indigo-600 hover:bg-indigo-50"
                  onClick={() => setShowEditProfile(true)}
                >
                  {t('editProfile')}
                </Button>
                
                <div className="mt-8 grid grid-cols-2 gap-3 w-full">
                  <div className="flex flex-col gap-1 rounded-2xl bg-white p-4 border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-2 text-indigo-600 mb-1">
                      <MapPinned size={16} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Location</span>
                    </div>
                    <span className="text-xs font-bold text-slate-700">{user.address || (lang === 'en' ? 'Set address' : 'កំណត់អាសយដ្ឋាន')}</span>
                  </div>
                  <div className="flex flex-col gap-1 rounded-2xl bg-white p-4 border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-2 text-indigo-600 mb-1">
                      <Phone size={16} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Phone</span>
                    </div>
                    <span className="text-xs font-bold text-slate-700">{user.phone || (lang === 'en' ? 'Set phone' : 'កំណត់លេខទូរស័ព្ទ')}</span>
                  </div>
                  <div className="flex flex-col gap-1 rounded-2xl bg-white p-4 border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-2 text-indigo-600 mb-1">
                      <User size={16} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Details</span>
                    </div>
                    <span className="text-xs font-bold text-slate-700">
                      {user.age > 0 ? `${user.age} yrs` : (lang === 'en' ? 'Set age' : 'កំណត់អាយុ')} • {user.gender || (lang === 'en' ? 'Set gender' : 'កំណត់ភេទ')}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 rounded-2xl bg-white p-4 border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-2 text-indigo-600 mb-1">
                      <Mail size={16} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Email</span>
                    </div>
                    <span className="text-xs font-bold text-slate-700 truncate">{user.email || (lang === 'en' ? 'Set email' : 'កំណត់អ៊ីមែល')}</span>
                  </div>
                </div>
              </div>

              <section>
                <h3 className="mb-3 font-bold text-slate-900">{t('badges')}</h3>
                <div className="grid grid-cols-4 gap-4">
                  {user.badges.map((badge, idx) => (
                    <div key={`${badge.id}-${idx}`} className={cn("flex flex-col items-center gap-1", !badge.unlocked && "opacity-40 grayscale")}>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white border border-slate-200 text-2xl shadow-sm">
                        {badge.icon}
                      </div>
                      <span className="text-[10px] font-medium text-center">{badge.name}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="mb-3 font-bold text-slate-900">{t('tools')}</h3>
                <div className="space-y-3">
                  <Card 
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50"
                    onClick={() => setShowResume(true)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-emerald-100 p-2 text-emerald-600">
                        <FileText size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold">{t('resumeBuilder')}</p>
                        <p className="text-xs text-slate-500">{t('resumeBuilderDesc')}</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-slate-400" />
                  </Card>
                  <Card 
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50"
                    onClick={() => setShowCVGuide(true)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-indigo-100 p-2 text-indigo-600">
                        <HelpCircle size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold">{t('cvTips')}</p>
                        <p className="text-xs text-slate-500">{t('cvTipsDesc')}</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-slate-400" />
                  </Card>
                  <Card 
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50"
                    onClick={() => setShowCVSample(true)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-amber-100 p-2 text-amber-600">
                        <BookOpen size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold">{t('cvSample')}</p>
                        <p className="text-xs text-slate-500">{t('cvSampleDesc')}</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-slate-400" />
                  </Card>
                  <Card 
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50"
                    onClick={() => setShowHowToUse(true)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-violet-100 p-2 text-violet-600">
                        <Info size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold">{t('howToUse')}</p>
                        <p className="text-xs text-slate-500">{t('howToUseDesc')}</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-slate-400" />
                  </Card>
                  
                  <Card 
                    className="flex flex-col gap-3 p-5 bg-indigo-50 border-indigo-100 cursor-pointer hover:bg-indigo-100 transition-colors group"
                    onClick={() => setShowAboutUs(true)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-indigo-600 p-2 text-white">
                          <Info size={20} />
                        </div>
                        <h4 className="font-bold text-indigo-900">{t('aboutUs' as any)}</h4>
                      </div>
                      <ArrowRight size={16} className="text-indigo-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <p className="text-xs text-indigo-700 leading-relaxed line-clamp-2">
                      {t('aboutUsDesc' as any)}
                    </p>
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">{t('readMore' as any)}</span>
                  </Card>
                </div>
              </section>

              <Button 
                variant="outline" 
                className="w-full text-indigo-600 border-indigo-100 hover:bg-indigo-50 mb-3"
                onClick={() => setActivePage('employer-dashboard')}
              >
                {lang === 'en' ? 'Switch to Employer Mode' : 'ប្តូរទៅរបៀបជានិយោជក'}
              </Button>

              <Button 
                variant="outline" 
                className="w-full text-rose-600 border-rose-100 hover:bg-rose-50"
                onClick={() => setIsLoggedIn(false)}
              >
                {t('logout')}
              </Button>
            </motion.div>
          )}

        </AnimatePresence>

        <AnimatePresence mode="wait">
          {activePage === 'employer-dashboard' && (
            <EmployerDashboard 
              lang={lang} 
              t={t} 
              onPostInternship={() => setActivePage('employer-post')} 
              apps={apps}
              employer={employer}
              setActivePage={setActivePage}
            />
          )}

          {activePage === 'employer-applications' && (
            <EmployerApplications 
              lang={lang} 
              t={t} 
              onReview={(app) => setSelectedApplication(app)} 
              apps={apps}
              onStatusUpdate={handleUpdateAppStatus}
              setActivePage={setActivePage}
            />
          )}

          {activePage === 'employer-profile' && (
            <EmployerProfileView 
              lang={lang} 
              t={t} 
              onSwitchMode={() => setActivePage('dashboard')} 
              employer={employer} 
              onEdit={() => setShowEditEmployerProfile(true)} 
            />
          )}
        </AnimatePresence>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {showResume && (
          <ResumePreview user={user} onClose={() => setShowResume(false)} />
        )}
        {showAIChatbot && (
          <AIChatbot 
            user={user} 
            internships={internships} 
            onClose={() => setShowAIChatbot(false)} 
            lang={lang} 
          />
        )}
        {showCVGuide && (
          <CVGuide onClose={() => setShowCVGuide(false)} />
        )}
        {showHowToUse && (
          <HowToUse onClose={() => setShowHowToUse(false)} lang={lang} />
        )}
        {showCVSample && (
          <CVSample onClose={() => setShowCVSample(false)} lang={lang} />
        )}
        {showEditProfile && (
          <EditProfile 
            user={user} 
            onClose={() => setShowEditProfile(false)} 
            onSave={(updated) => {
              setUser(prev => ({ ...prev, ...updated }));
              setShowEditProfile(false);
            }}
            lang={lang}
            t={t}
          />
        )}
        {showEditEmployerProfile && (
          <EditEmployerProfile
            employer={employer}
            onSave={handleUpdateEmployer}
            onClose={() => setShowEditEmployerProfile(false)}
            lang={lang}
            t={t}
          />
        )}
        {showNotifications && (
          <Notifications 
            notifications={notifications}
            onClose={() => setShowNotifications(false)}
            onMarkAsRead={markAsRead}
            onMarkAllAsRead={markAllAsRead}
            t={t}
          />
        )}
        {showAboutUs && (
          <AboutUsModal onClose={() => setShowAboutUs(false)} lang={lang} />
        )}
        {showApplicationForm && selectedInternship && (
          <ApplicationForm 
            user={user} 
            internship={selectedInternship} 
            onClose={() => setShowApplicationForm(false)} 
            lang={lang}
            t={t}
          />
        )}
        {activeChat && (
          <ChatWindow 
            session={activeChat} 
            onClose={() => setActiveChat(null)} 
            onSendMessage={handleSendMessage}
            user={user}
            internships={internships}
            lang={lang}
          />
        )}
        {selectedInternship && (
          <InternshipDetails 
            internship={selectedInternship} 
            onClose={() => setSelectedInternship(null)} 
            onChat={() => startChat(selectedInternship)}
            onApply={() => setShowApplicationForm(true)}
            lang={lang}
          />
        )}
        {selectedApplication && (
          <ApplicationDetailModal 
            application={selectedApplication} 
            onClose={() => setSelectedApplication(null)} 
            lang={lang} 
            t={t}
            onStatusUpdate={handleUpdateAppStatus}
          />
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/90 backdrop-blur-lg">
        <div className="mx-auto flex max-w-lg items-center justify-around px-2 py-3">
          {activePage.startsWith('employer-') ? (
            <>
              <NavButton 
                active={activePage === 'employer-dashboard'} 
                onClick={() => setActivePage('employer-dashboard')} 
                icon={<LayoutDashboard size={22} />} 
                label={t('home')} 
              />
              <NavButton 
                active={activePage === 'employer-applications'} 
                onClick={() => setActivePage('employer-applications')} 
                icon={<Briefcase size={22} />} 
                label={t('applications')} 
              />
              <NavButton 
                active={activePage === 'employer-profile'} 
                onClick={() => setActivePage('employer-profile')} 
                icon={<User size={22} />} 
                label={t('profile')} 
              />
            </>
          ) : (
            <>
              <NavButton 
                active={activePage === 'dashboard'} 
                onClick={() => setActivePage('dashboard')} 
                icon={<LayoutDashboard size={22} />} 
                label={t('home')} 
              />
              <NavButton 
                active={activePage === 'internships'} 
                onClick={() => setActivePage('internships')} 
                icon={<Briefcase size={22} />} 
                label={t('intern')} 
              />
              <NavButton 
                active={activePage === 'messages'} 
                onClick={() => setActivePage('messages')} 
                icon={<MessageSquare size={22} />} 
                label={t('chat')} 
              />
              <NavButton 
                active={activePage === 'profile'} 
                onClick={() => setActivePage('profile')} 
                icon={<User size={22} />} 
                label={t('profile')} 
              />
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

const NavButton: React.FC<{ active: boolean, onClick: () => void, icon: React.ReactNode, label: string }> = ({ active, onClick, icon, label }) => {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1 transition-all",
        active ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"
      )}
    >
      <div className={cn("rounded-xl p-1", active && "bg-indigo-50")}>
        {icon}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
    </button>
  );
}

const AboutUsModal: React.FC<{ onClose: () => void, lang: Language }> = ({ onClose, lang }) => {
  const t = (key: keyof typeof translations.en) => (translations[lang] as any)[key] || translations.en[key] || key;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-sm rounded-[32px] bg-white p-6 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-indigo-600 p-2 text-white shadow-lg shadow-indigo-100">
              <Info size={24} />
            </div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">{t('aboutUs' as any)}</h3>
          </div>
          <button onClick={onClose} className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200">
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto pr-2 no-scrollbar flex-1">
          <div className="relative mb-6 overflow-hidden rounded-2xl bg-indigo-600 p-6 text-white">
            <div className="relative z-10">
              <h4 className="text-lg font-bold mb-2">{t('appName' as any)}</h4>
              <p className="text-xs text-indigo-100 opacity-90 leading-relaxed">
                {t('aboutUsDesc' as any)}
              </p>
            </div>
            <Sparkles className="absolute -bottom-4 -right-4 text-white/10" size={80} />
          </div>

          <div className="space-y-4">
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {t('aboutUsFull' as any)}
            </p>
          </div>
        </div>

        <Button 
          className="mt-6 w-full rounded-2xl bg-indigo-600 py-4 font-bold text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700"
          onClick={onClose}
        >
          {lang === 'en' ? 'Close' : 'បិទ'}
        </Button>
      </motion.div>
    </div>
  );
}

const EditEmployerProfile: React.FC<{ employer: EmployerProfile, onSave: (data: Partial<EmployerProfile>) => void, onClose: () => void, lang: Language, t: any }> = ({ employer, onSave, onClose, lang, t }) => {
  const [formData, setFormData] = useState({
    companyName: employer.companyName,
    industry: employer.industry,
    location: employer.location,
    description: employer.description,
    website: employer.website,
    email: employer.email,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[32px] bg-white p-6 shadow-2xl no-scrollbar space-y-6"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">{t('editProfile')}</h3>
          <button onClick={onClose} className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Company Name</label>
            <input 
              type="text" 
              className="w-full rounded-2xl border-slate-100 bg-slate-50 py-3 px-4 text-sm focus:border-indigo-500 outline-none border"
              value={formData.companyName}
              onChange={e => setFormData(prev => ({...prev, companyName: e.target.value}))}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Industry</label>
            <input 
              type="text" 
              className="w-full rounded-2xl border-slate-100 bg-slate-50 py-3 px-4 text-sm focus:border-indigo-500 outline-none border"
              value={formData.industry}
              onChange={e => setFormData(prev => ({...prev, industry: e.target.value}))}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</label>
            <input 
              type="text" 
              className="w-full rounded-2xl border-slate-100 bg-slate-50 py-3 px-4 text-sm focus:border-indigo-500 outline-none border"
              value={formData.location}
              onChange={e => setFormData(prev => ({...prev, location: e.target.value}))}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</label>
            <textarea 
              rows={3}
              className="w-full rounded-2xl border-slate-100 bg-slate-50 py-3 px-4 text-sm focus:border-indigo-500 outline-none border"
              value={formData.description}
              onChange={e => setFormData(prev => ({...prev, description: e.target.value}))}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Website</label>
            <input 
              type="url" 
              className="w-full rounded-2xl border-slate-100 bg-slate-50 py-3 px-4 text-sm focus:border-indigo-500 outline-none border"
              value={formData.website}
              onChange={e => setFormData(prev => ({...prev, website: e.target.value}))}
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" className="flex-1 rounded-2xl" onClick={onClose}>
            {t('cancel')}
          </Button>
          <Button className="flex-1 rounded-2xl shadow-lg" onClick={() => onSave(formData)}>
            {t('saveChanges')}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

const InternshipCard: React.FC<{ internship: Internship, onClick?: () => void, onApply?: (e: React.MouseEvent) => void, lang: Language }> = ({ internship, onClick, onApply, lang }) => {
  return (
    <Card className="p-4 cursor-pointer hover:border-indigo-200" onClick={onClick}>
      <div className="flex gap-4">
        <img src={internship.companyLogo} alt={internship.companyName} className="h-12 w-12 rounded-xl object-cover border border-slate-100" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <h4 className="truncate text-sm font-bold text-slate-900">{internship.title}</h4>
            <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
              <Star size={10} fill="currentColor" />
              {internship.matchScore}% {lang === 'en' ? 'Match' : 'ត្រូវគ្នា'}
            </div>
          </div>
          <p className="text-xs text-slate-500">{internship.companyName}</p>
          
          <div className="mt-3 flex flex-wrap items-center gap-3 text-[10px] font-medium text-slate-400">
            <div className="flex items-center gap-1">
              <MapPin size={12} />
              {internship.location}
            </div>
            <div className="flex items-center gap-1">
              <Clock size={12} />
              {internship.deadline}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex -space-x-2">
              {internship.requirements.slice(0, 3).map((req, idx) => (
                <div key={`${req}-${idx}`} className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-[8px] font-bold text-slate-600">
                  {req[0]}
                </div>
              ))}
            </div>
            <Button size="sm" className="gap-1 rounded-lg" onClick={onApply}>
              {lang === 'en' ? 'Apply' : 'ដាក់ពាក្យ'} <ArrowRight size={14} />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

const PieChartInner: React.FC<{ data: any[] }> = ({ data }) => {
  return (
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={40}
        outerRadius={60}
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <RechartsTooltip />
    </PieChart>
  );
};

const EmployerDashboard: React.FC<{ lang: Language, t: any, onPostInternship: () => void, apps: Application[], employer: EmployerProfile, setActivePage: (p: Page) => void }> = ({ lang, t, onPostInternship, apps, employer, setActivePage }) => {
  const chartData = [
    { name: 'Mon', apps: 4 },
    { name: 'Tue', apps: 7 },
    { name: 'Wed', apps: 5 },
    { name: 'Thu', apps: 12 },
    { name: 'Fri', apps: 9 },
    { name: 'Sat', apps: 3 },
    { name: 'Sun', apps: 2 },
  ];

  const statusData = [
    { name: t('pending'), value: apps.filter(a => a.status === 'pending').length, color: '#94a3b8' },
    { name: t('shortlisted'), value: apps.filter(a => a.status === 'shortlisted').length, color: '#10b981' },
    { name: t('rejected'), value: apps.filter(a => a.status === 'rejected').length, color: '#f43f5e' },
  ];

  return (
    <motion.div
      key="employer-dashboard"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6 pb-10"
    >
      <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-indigo-600 to-purple-700 p-6 text-white shadow-2xl shadow-indigo-200">
        <div className="relative z-10">
          <Badge variant="outline" className="mb-3 border-white/30 bg-white/10 text-white backdrop-blur-sm">
            {t('companyDashboard')}
          </Badge>
          <h2 className="text-3xl font-black leading-tight tracking-tight">
            {employer.companyName}
          </h2>
          <p className="mt-2 text-sm text-indigo-100 opacity-90 leading-relaxed">
            {lang === 'en' ? 'Manage your talent pipeline and internship listings.' : 'គ្រប់គ្រងបេក្ខជន និងបញ្ជីកម្មសិក្សារបស់អ្នក។'}
          </p>
        </div>
      </section>

      <div className="grid grid-cols-3 gap-3">
        <Card className="p-3 flex flex-col items-center justify-center text-center border-slate-100">
          <span className="text-lg font-black text-indigo-600">128</span>
          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">{t('totalViews')}</span>
        </Card>
        <Card className="p-3 flex flex-col items-center justify-center text-center border-slate-100">
          <span className="text-lg font-black text-purple-600">{apps.length}</span>
          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">{t('totalApplications')}</span>
        </Card>
        <Card className="p-3 flex flex-col items-center justify-center text-center border-slate-100">
          <span className="text-lg font-black text-rose-600">{MOCK_INTERNSHIPS.filter(i => i.companyName === employer.companyName).length}</span>
          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">{t('activeListings')}</span>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 border-slate-100">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Application Trends</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                <YAxis hide />
                <RechartsTooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)'}} />
                <Bar dataKey="apps" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-4 border-slate-100">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Status Distribution</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChartInner data={statusData} />
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-900">{t('recentApplications')}</h3>
          <button onClick={() => setActivePage('employer-applications')} className="text-xs font-semibold text-indigo-600 hover:underline">
            {t('seeAll')}
          </button>
        </div>
        <div className="space-y-3">
          {apps.slice(0, 3).map(app => (
            <div key={app.id} className="flex items-center gap-3 p-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-100 hover:border-indigo-100 transition-colors cursor-pointer group" onClick={() => setActivePage('employer-applications')}>
              <div className="h-10 w-10 rounded-full bg-slate-100 overflow-hidden ring-2 ring-white shadow-sm">
                <img src={app.studentPhoto || ''} alt={app.studentName} className="h-full w-full object-cover group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex-1 min-w-0 text-slate-900">
                <p className="text-xs font-bold truncate">{app.studentName}</p>
                <p className="text-[10px] text-slate-500 truncate">{app.studentMajor}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge variant={app.status === 'pending' ? 'warning' : app.status === 'shortlisted' ? 'success' : 'destructive'} className="text-[7px]">
                  {app.status}
                </Badge>
                <span className="text-[8px] text-slate-400">1h ago</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}

const EmployerApplications: React.FC<{ lang: Language, t: any, onReview: (app: Application) => void, apps: Application[], onStatusUpdate: (id: string, status: 'shortlisted' | 'rejected') => void, setActivePage: (p: Page) => void }> = ({ lang, t, onReview, apps, onStatusUpdate, setActivePage }) => {
  return (
    <motion.div
      key="employer-applications"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4 pb-10"
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">{t('applications')}</h2>
        <Badge variant="info">{apps.length} Total</Badge>
      </div>

      <div className="space-y-4">
        {apps.map(app => (
          <Card key={app.id} className="p-4 border-slate-100 overflow-hidden relative group">
            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-xl bg-slate-100 overflow-hidden">
                <img src={app.studentPhoto || ''} alt={app.studentName} className="h-full w-full object-cover group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{app.studentName}</h4>
                    <p className="text-xs text-slate-500">{app.studentMajor}</p>
                  </div>
                  <Badge variant={app.status === 'pending' ? 'warning' : app.status === 'shortlisted' ? 'success' : 'destructive'} className="text-[8px]">
                    {app.status}
                  </Badge>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" className="h-8 text-[10px] flex-1 font-bold" onClick={() => onReview(app)}>
                    <Eye size={14} className="mr-1" /> {t('reviewApplication')}
                  </Button>
                  <div className="flex gap-2">
                    <button 
                      className={cn(
                        "h-8 w-8 flex items-center justify-center rounded-lg transition-colors",
                        app.status === 'shortlisted' ? "bg-emerald-600 text-white" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                      )}
                      onClick={() => onStatusUpdate(app.id, 'shortlisted')}
                    >
                      <Check size={16} />
                    </button>
                    <button 
                      className={cn(
                        "h-8 w-8 flex items-center justify-center rounded-lg transition-colors",
                        app.status === 'rejected' ? "bg-rose-600 text-white" : "bg-rose-50 text-rose-600 hover:bg-rose-100"
                      )}
                      onClick={() => onStatusUpdate(app.id, 'rejected')}
                    >
                      <Ban size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}

const EmployerProfileView: React.FC<{ lang: Language, t: any, onSwitchMode: () => void, employer: EmployerProfile, onEdit: () => void }> = ({ lang, t, onSwitchMode, employer, onEdit }) => {
  return (
    <motion.div
      key="employer-profile"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex flex-col items-center py-6">
        <div className="relative mb-6">
          <div className="h-32 w-32 rounded-3xl bg-white p-1 shadow-xl ring-1 ring-slate-100 rotate-3 flex items-center justify-center overflow-hidden">
            <img src={employer.logo} alt="Company Logo" className="h-full w-full rounded-2xl object-cover -rotate-3" />
          </div>
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">{employer.companyName}</h2>
        <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest mt-1 opacity-80">{employer.industry}</p>
        
        <div className="mt-4 flex gap-2">
          <Button size="sm" variant="outline" className="rounded-xl text-[10px] font-bold border-indigo-100 text-indigo-600 hover:bg-indigo-50" onClick={onEdit}>
            {lang === 'en' ? 'Edit Profile' : 'កែសម្រួលប្រវត្តិរូប'}
          </Button>
          <Button size="sm" variant="outline" className="rounded-xl text-[10px] font-bold border-indigo-100 text-indigo-600 hover:bg-indigo-50">
            {lang === 'en' ? 'Settings' : 'ការកំណត់'}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <Card className="p-6">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">About</h3>
          <p className="text-sm text-slate-600 leading-relaxed">{employer.description}</p>
          <div className="mt-6 flex flex-col gap-3">
            <div className="flex items-center gap-3 text-xs">
              <Globe size={14} className="text-indigo-600" />
              <a href={employer.website} className="text-indigo-600 hover:underline">{employer.website}</a>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <MapPin size={14} className="text-slate-400" />
              <span className="text-slate-600">{employer.location}</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <Mail size={14} className="text-slate-400" />
              <span className="text-slate-600">{employer.email}</span>
            </div>
          </div>
        </Card>

        <Button 
          variant="outline" 
          className="w-full text-indigo-600 border-indigo-100 hover:bg-indigo-50 mb-3"
          onClick={onSwitchMode}
        >
          {lang === 'en' ? 'Switch to Student Mode' : 'ប្តូរទៅរបៀបជានិស្សិត'}
        </Button>

        <Button 
          variant="outline" 
          className="w-full text-rose-600 border-rose-100 hover:bg-rose-50"
        >
          {t('logout')}
        </Button>
      </div>
    </motion.div>
  );
}

