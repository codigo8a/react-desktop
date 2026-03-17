/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback } from 'react';
import { getAppById } from '../apps/apps';

const DesktopContext = createContext(null);

export const DesktopProvider = ({ children, initialWindows = [] }) => {
  const [windows, setWindows] = useState(initialWindows);
  const [activeWindowId, setActiveWindowId] = useState(initialWindows[0]?.id || null);
  const [maximizedWindowId, setMaximizedWindowId] = useState(null);
  const [zIndexCounter, setZIndexCounter] = useState(10);

  const bringToFront = useCallback((id) => {
    const newZIndex = zIndexCounter + 1;
    setZIndexCounter(newZIndex);
    
    setActiveWindowId(id);
    setWindows(prev => prev.map(win => ({
      ...win,
      isActive: win.id === id,
      zIndex: win.id === id ? newZIndex : win.zIndex
    })));
  }, [zIndexCounter]);

  const handleWindowFocus = useCallback((id) => {
    bringToFront(id);
  }, [bringToFront]);

  const handleWindowClick = useCallback((id) => {
    const isMaximized = maximizedWindowId === id;
    if (isMaximized) {
      bringToFront(id);
    }
  }, [maximizedWindowId, bringToFront]);

  const handleMinimize = useCallback((id) => {
    setWindows(prev => prev.map(win => 
      win.id === id ? { ...win, isMinimized: true } : win
    ));
    setMaximizedWindowId(prev => prev === id ? null : prev);
    const visibleWindows = windows.filter(w => !w.isMinimized && w.id !== id);
    if (visibleWindows.length > 0) {
      setActiveWindowId(visibleWindows[0].id);
    }
  }, [windows]);

  const handleRestore = useCallback((id) => {
    bringToFront(id);
    
    setWindows(prev => prev.map(win => 
      win.id === id ? { ...win, isMinimized: false, isActive: true } : { ...win, isActive: false }
    ));
    setMaximizedWindowId(prev => prev === id ? null : prev);
    setActiveWindowId(id);
  }, [bringToFront]);

  const handleClose = useCallback((id) => {
    setMaximizedWindowId(prev => prev === id ? null : prev);
    setWindows(prev => {
      const remaining = prev.filter(win => win.id !== id);
      if (remaining.length > 0) {
        setActiveWindowId(remaining[remaining.length - 1].id);
      }
      return remaining;
    });
  }, []);

  const handleMaximize = useCallback((id) => {
    const newZIndex = zIndexCounter + 1;
    setZIndexCounter(newZIndex);
    
    setMaximizedWindowId(prev => prev === id ? null : id);
    
    setWindows(prev => prev.map(win => ({
      ...win,
      isActive: win.id === id,
      zIndex: win.id === id ? newZIndex : win.zIndex
    })));
    setActiveWindowId(id);
  }, [zIndexCounter]);

  const addWindow = useCallback((windowConfig) => {
    const newZIndex = zIndexCounter + 1;
    setZIndexCounter(newZIndex);
    
    const offset = Math.floor((newZIndex - 10) / 2) * 20;
    
    const newWindow = {
      ...windowConfig,
      id: windowConfig.appId + '-' + Date.now(),
      initialPosition: windowConfig.initialPosition || { x: 100 + offset, y: 100 + offset },
      zIndex: newZIndex
    };
    setWindows(prev => [...prev, newWindow]);
    setActiveWindowId(newWindow.id);
  }, [zIndexCounter]);

  const openApp = useCallback((appId) => {
    const app = getAppById(appId);
    if (!app) return;

    const existingWindow = windows.find(w => w.appId === appId);
    
    if (existingWindow) {
      const newZIndex = zIndexCounter + 1;
      setZIndexCounter(newZIndex);
      setMaximizedWindowId(prev => prev === existingWindow.id ? null : prev);
      
      setWindows(prev => prev.map(win => 
        win.appId === appId 
          ? { ...win, zIndex: newZIndex, isMinimized: false, isActive: true }
          : { ...win, isActive: false }
      ));
      setActiveWindowId(existingWindow.id);
    } else {
      const AppComponent = app.component;
      addWindow({
        appId: app.id,
        title: app.title,
        initialSize: app.defaultSize,
        centered: app.centered,
        content: <AppComponent />
      });
    }
  }, [windows, zIndexCounter, addWindow]);

  const isWindowOpen = useCallback((appId) => {
    return windows.some(w => w.appId === appId);
  }, [windows]);

  const value = {
    windows,
    activeWindowId,
    maximizedWindowId,
    handleWindowFocus,
    handleWindowClick,
    handleMinimize,
    handleRestore,
    handleClose,
    handleMaximize,
    addWindow,
    openApp,
    isWindowOpen
  };

  return (
    <DesktopContext.Provider value={value}>
      {children}
    </DesktopContext.Provider>
  );
};

export const useDesktop = () => {
  const context = useContext(DesktopContext);
  if (!context) {
    throw new Error('useDesktop must be used within a DesktopProvider');
  }
  return context;
};
