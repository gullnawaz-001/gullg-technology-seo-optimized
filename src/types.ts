export type ViewState = 'landing' | 'portfolio' | 'client-portal' | 'calculator' | 'services' | 'chatbot-control' | 'knowledge-hub' | 'admin' | 'contact' | 'saas-showcase' | 'medqbank-showcase' | 'cheela-showcase' | 'social-media-showcase' | 'ux-showcase' | 'ai-showcase' | 'ora-grande-showcase' | 'company' | 'privacy' | 'terms';

export interface Service {
  id: string;
  title: string;
  category: string;
  description: string;
  deliverables: string[];
  techStack: string[];
  timeline: string;
  icon: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  stats: { label: string; value: string }[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  status?: 'Published' | 'Draft';
  seoTitle?: string;
  metaDescription?: string;
  slug?: string;
  imageAlt?: string;
}

export interface ClientProject {
  id: string;
  name: string;
  clientName: string;
  status: 'planning' | 'design' | 'development' | 'in-progress' | 'qa' | 'deployment' | 'completed';
  progress: number;
  dueDate: string;
  milestones?: Milestone[];
  contract?: Contract;
}

export interface Milestone {
  id: string;
  name: string;
  targetDate: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  completionDate?: string;
}

export interface Contract {
  id: string;
  title: string;
  content: string;
  signed: boolean;
  signedBy?: string;
  signedAt?: string;
  ipAddress?: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  createdAt: string;
  messages: { sender: 'Client' | 'Admin'; text: string; timestamp: string }[];
}

export interface ProjectFile {
  id: string;
  name: string;
  size: string;
  date: string;
  direction: 'Sent to Client' | 'Received from Client';
  projectId?: string;
  clientName?: string;
  acknowledged?: boolean;
  adminComment?: string;
  fileUrl?: string;
}

export interface ActivityEntry {
  id: string;
  description: string;
  timestamp: string;
  triggeredBy: 'Client' | 'Admin';
}

export interface Notification {
  id: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'invoice' | 'milestone' | 'admin' | 'file';
}

export interface WelcomeVideoConfig {
  isPopupEnabled: boolean;
  popupVideoSource: string;
  autoPlay: boolean;
  muted: boolean;
  showSkipButton: boolean;
  closeOnEnd: boolean;
}
