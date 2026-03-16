/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback } from 'react';

const DesktopContext = createContext(null);

export const DesktopProvider = ({ children, initialWindows = [] }) => {
  const [windows, setWindows] = useState(initialWindows);
  const [activeWindowId, setActiveWindowId] = useState(initialWindows[0]?.id || null);

  const handleWindowFocus = useCallback((id) => {
    setActiveWindowId(id);
    setWindows(prev => prev.map(win => ({
      ...win,
      isActive: win.id === id
    })));
  }, []);

  const handleMinimize = useCallback((id) => {
    setWindows(prev => prev.map(win => 
      win.id === id ? { ...win, isMinimized: true } : win
    ));
    const visibleWindows = windows.filter(w => !w.isMinimized && w.id !== id);
    if (visibleWindows.length > 0) {
      setActiveWindowId(visibleWindows[0].id);
    }
  }, [windows]);

  const handleRestore = useCallback((id) => {
    setWindows(prev => prev.map(win => 
      win.id === id ? { ...win, isMinimized: false, isActive: true } : { ...win, isActive: false }
    ));
    setActiveWindowId(id);
  }, []);

  const handleClose = useCallback((id) => {
    setWindows(prev => {
      const remaining = prev.filter(win => win.id !== id);
      if (remaining.length > 0) {
        setActiveWindowId(remaining[remaining.length - 1].id);
      }
      return remaining;
    });
  }, []);

  const addWindow = useCallback((window) => {
    setWindows(prev => [...prev, window]);
    setActiveWindowId(window.id);
  }, []);

  const openWindow = useCallback((windowConfig) => {
    const existingWindow = windows.find(w => w.id === windowConfig.id);
    
    if (existingWindow) {
      if (existingWindow.isMinimized) {
        handleRestore(windowConfig.id);
      } else {
        handleWindowFocus(windowConfig.id);
      }
    } else {
      addWindow(windowConfig);
    }
  }, [windows, handleRestore, handleWindowFocus, addWindow]);

  const isWindowOpen = useCallback((id) => {
    return windows.some(w => w.id === id);
  }, [windows]);

  const value = {
    windows,
    activeWindowId,
    handleWindowFocus,
    handleMinimize,
    handleRestore,
    handleClose,
    addWindow,
    openWindow,
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
