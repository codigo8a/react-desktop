import { WelcomeApp } from './WelcomeApp';
import { NotepadApp } from './NotepadApp';

export const APPS = {
  welcome: {
    id: 'welcome',
    title: 'Welcome',
    icon: '👋',
    component: WelcomeApp,
    defaultSize: { width: 400, height: 300 },
    centered: true
  },
  notepad: {
    id: 'notepad',
    title: 'Notepad',
    icon: '📝',
    component: NotepadApp,
    defaultSize: { width: 450, height: 350 },
    centered: false
  }
};

export const getAppById = (id) => {
  return APPS[id] || null;
};

export const getAppList = () => {
  return Object.values(APPS);
};
