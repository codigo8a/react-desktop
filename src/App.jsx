import { Window } from './components/organisms/Window';
import { TaskBar } from './components/organisms/TaskBar';
import { StartMenu } from './components/organisms/StartMenu';
import { DesktopIcons } from './components/DesktopIcons';
import { DesktopProvider, useDesktop } from './context/DesktopContext';
import { LanguageProvider } from './context/LanguageContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useStartMenu } from './hooks/useWindow';
import { APPS } from './apps/apps';
import { useFileSystem } from './hooks/useFileSystem';
import { useEffect } from 'react';

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

  const { findFileByUrl } = useFileSystem();

  const { isOpen: isStartOpen, toggle: toggleStart, close: closeStart } = useStartMenu();

  // Handle initial URL routing
  useEffect(() => {
    const path = decodeURIComponent(window.location.pathname.slice(1));
    if (path) {
      const parts = path.split('/');
      if (parts.length >= 2) {
        const folder = parts[0];
        const filename = parts[1];
        
        const fileData = findFileByUrl(folder, filename);
        if (fileData) {
          const displayTitle = fileData.name.replace('.md', '');
          openApp('fileViewer', {
            file: {
              name: displayTitle,
              content: fileData.content,
              rawContent: fileData.rawContent,
              folder: fileData.folder,
              date: fileData.date
            },
            windowKey: `${fileData.folder}/${fileData.name}`,
            title: displayTitle
          });
        }
      }
    }
    // We only want this to run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync URL with window state
  useEffect(() => {
    const isAnyFileViewerOpen = windows.some(win => win.appId === 'fileViewer' && !win.isMinimized);
    
    if (!isAnyFileViewerOpen && window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
    }
  }, [windows]);

  const onMinimize = (id) => {
    handleMinimize(id);
  };

  const onClose = (id) => {
    handleClose(id);
  };

  const handleStartClick = (e) => {
    e.stopPropagation();
    toggleStart();
  };

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
      
      <DesktopIcons />
      
      {isStartOpen && (
        <StartMenu 
          onClose={closeStart}
          onOpenApp={openApp}
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
          onMinimize={onMinimize}
          onMaximize={handleMaximize}
          onClose={onClose}
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
      <LanguageProvider>
        <DesktopProvider initialWindows={initialWindows}>
          <Desktop />
        </DesktopProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
