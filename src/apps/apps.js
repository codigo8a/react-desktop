import { WelcomeApp } from './WelcomeApp';
import { NotepadApp } from './NotepadApp';
import { FileExplorerApp } from './FileExplorerApp';
import { FileViewerApp } from './FileViewerApp';

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
    centered: true
  },
  fileExplorer: {
    id: 'fileExplorer',
    title: 'Explorador de Archivos',
    icon: '📁',
    component: FileExplorerApp,
    defaultSize: { width: 600, height: 350 },
    centered: false
  },
  fileViewer: {
    id: 'fileViewer',
    title: 'Visor de Archivo',
    icon: '📄',
    component: FileViewerApp,
    defaultSize: { width: 500, height: 400 },
    centered: true,
    singleInstance: false
  }
};

export const getAppById = (id) => {
  return APPS[id] || null;
};

export const getAppList = () => {
  return Object.values(APPS);
};
