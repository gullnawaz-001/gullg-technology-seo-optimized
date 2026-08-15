import { useState, useEffect } from 'react';

export interface Message {
  sender: 'client' | 'admin';
  text: string;
  timestamp: string;
}

export interface ProposalItem {
  title: string;
  original: number;
  suggested: number;
}

export interface Thread {
  id: string;
  clientName: string;
  email: string;
  totalEstimatedCost: string;
  clientProposedCost: string;
  messages: Message[];
  proposalItems: ProposalItem[];
  unreadByAdmin: boolean;
  unreadByClient: boolean;
}

const DEFAULT_THREADS: Thread[] = [
  {
    id: 'THREAD-101',
    clientName: 'Cheela Cafe Admin',
    email: 'cheelacafe@gmail.com',
    totalEstimatedCost: '$2,300',
    clientProposedCost: '$2,000',
    messages: [
      { sender: 'client', text: 'Hello! I sent a proposal for App Dev & Social Media handling. Our target budget is $2,000.', timestamp: '14:30' },
      { sender: 'admin', text: 'Hi! We received your suggestion. We can offer $2,050 with priority support.', timestamp: '14:45' }
    ],
    proposalItems: [
      { title: 'Modern Web & Mobile App Development', original: 1500, suggested: 1350 },
      { title: 'Social Media Management & Strategy', original: 350, suggested: 300 }
    ],
    unreadByAdmin: true,
    unreadByClient: false
  }
];

export function useThreads() {
  const [threads, setThreads] = useState<Thread[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('gullg_threads');
    if (saved) {
      try {
        setThreads(JSON.parse(saved));
      } catch (e) {
        setThreads(DEFAULT_THREADS);
      }
    } else {
      setThreads(DEFAULT_THREADS);
    }
  }, []);

  const updateThreads = (newThreads: Thread[]) => {
    setThreads(newThreads);
    localStorage.setItem('gullg_threads', JSON.stringify(newThreads));
  };

  return { threads, updateThreads };
}
