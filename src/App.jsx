import { useState, useEffect } from 'react';
import { Window } from './components/organisms/Window';
import { TaskBar } from './components/organisms/TaskBar';
import { StartMenu } from './components/organisms/StartMenu';
import { DesktopProvider, useDesktop } from './context/DesktopContext';
import './components/templates/Desktop/index.css';

const welcomeContent = (
  <div style={{ padding: '10px' }}>
    <p>Welcome to React Desktop!</p>
    <p style={{ marginTop: '10px' }}>This is a Windows 98 style desktop environment.</p>
    <p style={{ marginTop: '10px' }}>You can drag windows by their title bar.</p>
    <p style={{ marginTop: '10px' }}>Try minimizing, maximizing, and closing windows!</p>
  </div>
);

const initialWindows = [
  {
    id: 'welcome',
    title: 'Welcome',
    isMinimized: false,
    isActive: true,
    initialPosition: { x: 0, y: 0 },
    content: welcomeContent
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
    openWindow
  } = useDesktop();

  const [isStartOpen, setIsStartOpen] = useState(false);

  useEffect(() => {
    let isClickFromStart = false;
    
    const handleClickOutside = (e) => {
      if (isClickFromStart) {
        isClickFromStart = false;
        return;
      }
      
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

  const handleOpenWelcome = () => {
    openWindow({
      id: 'welcome',
      title: 'Welcome',
      isMinimized: false,
      isActive: true,
      initialPosition: { x: 0, y: 0 },
      content: welcomeContent
    });
    setIsStartOpen(false);
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
      
      {isStartOpen && (
        <StartMenu 
          onClose={() => setIsStartOpen(false)}
          onOpenWelcome={handleOpenWelcome}
        />
      )}
      
      {windows.map(win => (
        <Window
          key={win.id}
          id={win.id}
          title={win.title}
          isActive={activeWindowId === win.id && !win.isMinimized}
          isMinimized={win.isMinimized}
          centered={true}
          initialPosition={win.initialPosition}
          initialSize={win.initialSize}
          onFocus={handleWindowFocus}
          onMinimize={handleMinimize}
          onMaximize={() => {}}
          onClose={handleClose}
        >
          {win.content}
        </Window>
      ))}
    </div>
  );
};

function App() {
  return (
    <DesktopProvider initialWindows={initialWindows}>
      <Desktop />
    </DesktopProvider>
  );
}

export default App;
