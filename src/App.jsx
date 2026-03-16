import { useState } from 'react';
import { Window } from './components/organisms/Window';
import { TaskBar } from './components/organisms/TaskBar';

function App() {
  const [windows, setWindows] = useState([
    {
      id: 'welcome',
      title: 'Welcome',
      isMinimized: false,
      isActive: true,
      initialPosition: { x: 0, y: 0 },
      content: (
        <div style={{ padding: '10px' }}>
          <p>Welcome to React Desktop!</p>
          <p style={{ marginTop: '10px' }}>This is a Windows 98 style desktop environment.</p>
          <p style={{ marginTop: '10px' }}>You can drag windows by their title bar.</p>
          <p style={{ marginTop: '10px' }}>Try minimizing, maximizing, and closing windows!</p>
        </div>
      )
    }
  ]);

  const [activeWindowId, setActiveWindowId] = useState('welcome');

  const handleWindowFocus = (id) => {
    setActiveWindowId(id);
    setWindows(prev => prev.map(win => ({
      ...win,
      isActive: win.id === id
    })));
  };

  const handleMinimize = (id) => {
    setWindows(prev => prev.map(win => 
      win.id === id ? { ...win, isMinimized: true } : win
    ));
    const visibleWindows = windows.filter(w => !w.isMinimized && w.id !== id);
    if (visibleWindows.length > 0) {
      setActiveWindowId(visibleWindows[0].id);
    }
  };

  const handleRestore = (id) => {
    setWindows(prev => prev.map(win => 
      win.id === id ? { ...win, isMinimized: false, isActive: true } : { ...win, isActive: false }
    ));
    setActiveWindowId(id);
  };

  const handleClose = (id) => {
    setWindows(prev => {
      const remaining = prev.filter(win => win.id !== id);
      if (remaining.length > 0) {
        setActiveWindowId(remaining[remaining.length - 1].id);
      }
      return remaining;
    });
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
      />
      
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
}

export default App;
