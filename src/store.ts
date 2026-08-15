import { ProjectFile, ClientProject, BlogPost } from './types';
import { initialFilesMock, notificationsMock, clientProjectsData, blogPostsData } from './data';
import { useState, useEffect } from 'react';

type Listener = () => void;

class GlobalStore {
  files: ProjectFile[] = initialFilesMock;
  notifications: any[] = notificationsMock;
  projects: ClientProject[] = clientProjectsData;
  blogPosts: BlogPost[] = blogPostsData.map(p => ({...p, status: 'Published' as const, slug: p.slug || p.id}));
  listeners: Set<Listener> = new Set();

  setFiles = (newFiles: ProjectFile[] | ((prev: ProjectFile[]) => ProjectFile[])) => {
    if (typeof newFiles === 'function') {
      this.files = newFiles(this.files);
    } else {
      this.files = newFiles;
    }
    this.notify();
  };

  setNotifications = (newNotifications: any[] | ((prev: any[]) => any[])) => {
    if (typeof newNotifications === 'function') {
      this.notifications = newNotifications(this.notifications);
    } else {
      this.notifications = newNotifications;
    }
    this.notify();
  };

  setBlogPosts = (newPosts: BlogPost[] | ((prev: BlogPost[]) => BlogPost[])) => {
    if (typeof newPosts === 'function') {
      this.blogPosts = newPosts(this.blogPosts);
    } else {
      this.blogPosts = newPosts;
    }
    this.notify();
  };

  setProjects = (newProjects: ClientProject[] | ((prev: ClientProject[]) => ClientProject[])) => {
    if (typeof newProjects === 'function') {
      this.projects = newProjects(this.projects);
    } else {
      this.projects = newProjects;
    }
    this.notify();
  };

  notify() {
    this.listeners.forEach(l => l());
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

export const globalStore = new GlobalStore();

export function useGlobalStore() {
  const [, setTick] = useState(0);
  useEffect(() => {
    const unsubscribe = globalStore.subscribe(() => setTick(t => t + 1));
    return () => { unsubscribe(); };
  }, []);
  
  return {
    files: globalStore.files,
    setFiles: globalStore.setFiles,
    notifications: globalStore.notifications,
    setNotifications: globalStore.setNotifications,
    projects: globalStore.projects,
    setProjects: globalStore.setProjects,
    blogPosts: globalStore.blogPosts,
    setBlogPosts: globalStore.setBlogPosts
  };
}
