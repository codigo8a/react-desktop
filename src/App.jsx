import { useState, useEffect } from 'react';
import { Window } from './components/organisms/Window';
import { TaskBar } from './components/organisms/TaskBar';
import { StartMenu } from './components/organisms/StartMenu';
import { DesktopProvider, useDesktop } from './context/DesktopContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { APPS } from './apps/apps';
import './components/templates/Desktop/index.css';

const initialWindows = [
  {
    appId: 'welcome',
    id: 'welcome-' + Date.now(),
    title: 'Welcome',
    isMinimized: false,
    isActive: true,
    isMaximized: false,
    currentPosition: null,
    initialPosition: { x: 0, y: 0 },
    initialSize: APPS.welcome.defaultSize,
    centered: APPS.welcome.centered,
    zIndex: 10,
    content: <APPS.welcome.component />
  }
];

const Desktop = () => {
  const {
    windows,
    activeWindowId,
    handleWindowFocus,
    handleMinimize,
    handleRestore,
    handleClose,
    handleMaximize,
    handleWindowMove,
    openApp
  } = useDesktop();

  const [isStartOpen, setIsStartOpen] = useState(false);
  const [testErrorTrigger, setTestErrorTrigger] = useState(0);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const startMenu = document.querySelector('.start-menu');
      if (isStartOpen && startMenu && !startMenu.contains(e.target)) {
        setIsStartOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isStartOpen]);

  const handleStartClick = (e) => {
    e.stopPropagation();
    setIsStartOpen(!isStartOpen);
  };

  const handleOpenApp = (appId) => {
    openApp(appId);
  };

  const handleTestError = () => {
    setTestErrorTrigger(prev => prev + 1);
  };

  useEffect(() => {
    if (testErrorTrigger > 0) {
      throw new Error('This is a test error to verify the ErrorBoundary works correctly!');
    }
  }, [testErrorTrigger]);

  return (
    <div className="desktop" style={{
      width: '100vw',
      height: '100vh',
      background: '#008080',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <TaskBar 
        windows={windows}
        activeWindowId={activeWindowId}
        onWindowClick={handleWindowFocus}
        onRestore={handleRestore}
        isStartOpen={isStartOpen}
        onStartClick={handleStartClick}
      />
      
      {isStartOpen && (
        <StartMenu 
          onClose={() => setIsStartOpen(false)}
          onOpenApp={handleOpenApp}
          onTestError={handleTestError}
        />
      )}
      
      {windows.map(win => (
        <Window
          key={win.id}
          id={win.id}
          title={win.title}
          isActive={activeWindowId === win.id && !win.isMinimized}
          isMinimized={win.isMinimized}
          centered={win.centered}
          initialPosition={win.initialPosition}
          initialSize={win.initialSize}
          zIndex={win.zIndex}
          isMaximized={win.isMaximized}
          currentPosition={win.currentPosition}
          onFocus={handleWindowFocus}
          onMinimize={handleMinimize}
          onMaximize={handleMaximize}
          onClose={handleClose}
          onMove={handleWindowMove}
        >
          {win.content}
        </Window>
      ))}
    </div>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <DesktopProvider initialWindows={initialWindows}>
        <Desktop />
      </DesktopProvider>
    </ErrorBoundary>
  );
}

export default App;
