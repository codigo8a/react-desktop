import { Window } from './components/organisms/Window';
import { TaskBar } from './components/organisms/TaskBar';
import { StartMenu } from './components/organisms/StartMenu';
import { DesktopIcons } from './components/DesktopIcons';
import { DesktopProvider, useDesktop } from './context/DesktopContext';
import { LanguageProvider } from './context/LanguageContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useStartMenu } from './hooks/useWindow';
import { APPS } from './apps/apps';

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

  const { isOpen: isStartOpen, toggle: toggleStart, close: closeStart } = useStartMenu();

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
      <LanguageProvider>
        <DesktopProvider initialWindows={initialWindows}>
          <Desktop />
        </DesktopProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
