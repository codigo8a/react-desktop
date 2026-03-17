import { WelcomeApp } from './WelcomeApp';
import { NotepadApp } from './NotepadApp';
import { FileExplorerApp } from './FileExplorerApp';
import { FileViewerApp } from './FileViewerApp';
import { SearchApp } from './SearchApp';
import { SettingsApp } from './SettingsApp';

export const APPS = {
  welcome: {
    id: 'welcome',
    title: 'Welcome',
    icon: '👋',
    component: WelcomeApp,
    defaultSize: { width: 700, height: 420 },
    centered: true
  },
  notepad: {
    id: 'notepad',
    title: 'Notepad',
    icon: '📝',
    component: NotepadApp,
    defaultSize: { width: 450, height: 350 },
    centered: true
  },
  fileExplorer: {
    id: 'fileExplorer',
    title: 'Documents',
    icon: '📄',
    component: FileExplorerApp,
    defaultSize: { width: 600, height: 350 },
    centered: false
  },
  fileViewer: {
    id: 'fileViewer',
    title: 'File Viewer',
    icon: '📄',
    component: FileViewerApp,
    defaultSize: { width: 1000, height: 800 },
    centered: true,
    singleInstance: false
  },
  search: {
    id: 'search',
    title: 'Search Files',
    icon: '🔍',
    component: SearchApp,
    defaultSize: { width: 500, height: 350 },
    centered: false
  },
  settings: {
    id: 'settings',
    title: 'Settings',
    icon: '⚙️',
    component: SettingsApp,
    defaultSize: { width: 300, height: 150 },
    centered: true
  }
};

export const getAppById = (id) => {
  return APPS[id] || null;
};

export const getAppList = () => {
  return Object.values(APPS);
};
