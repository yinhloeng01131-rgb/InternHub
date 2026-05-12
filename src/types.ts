export interface Internship {
  id: string;
  companyName: string;
  companyLogo: string;
  companyDescription: string;
  benefits: string[];
  duration: string; // e.g., "3 months", "6 months"
  title: string;
  description: string;
  location: string;
  type: 'Remote' | 'On-site' | 'Hybrid';
  requirements: string[];
  matchScore: number; // 0-100
  deadline: string;
  category: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
}

export interface ChatSession {
  companyId: string;
  companyName: string;
  companyLogo: string;
  lastMessage: string;
  messages: Message[];
}

export interface Course {
  id: string;
  title: string;
  provider: string;
  duration: string;
  description: string;
  topics: string[];
  tasks: Task[];
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  points: number;
}

export interface UserProfile {
  name: string;
  major: string;
  university: string;
  age: number;
  gender: string;
  address: string;
  phone: string;
  email: string;
  interests: string[];
  badges: Badge[];
  completedInternships: number;
  photoURL?: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlocked: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'application' | 'message' | 'system' | 'achievement';
  timestamp: string;
  read: boolean;
  companyName?: string;
  companyLogo?: string;
}

export interface Application {
  id: string;
  internshipId: string;
  internshipTitle: string;
  studentId: string;
  studentName: string;
  studentPhoto?: string;
  studentMajor: string;
  status: 'pending' | 'shortlisted' | 'rejected';
  timestamp: string;
  coverLetter: string;
}

export interface EmployerProfile {
  companyName: string;
  industry: string;
  location: string;
  description: string;
  logo: string;
  website: string;
  email: string;
}
