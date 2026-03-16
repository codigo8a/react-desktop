import { useState } from 'react';
import '98.css';
import { Window } from './components/organisms/Window';
import { TaskBar } from './components/organisms/TaskBar';

function App() {
  const [windows, setWindows] = useState([
    {
      id: 'welcome',
      title: 'Welcome',
      isMinimized: false,
      isActive: true,
      initialPosition: { x: 100, y: 50 },
      content: (
        <div style={{ padding: '10px' }}>
          <p>Welcome to React Desktop!</p>
          <p style={{ marginTop: '10px' }}>This is a Windows 98 style desktop environment.</p>
          <p style={{ marginTop: '10px' }}>You can drag windows by their title bar.</p>
          <p style={{ marginTop: '10px' }}>Try minimizing, maximizing, and closing windows!</p>
        </div>
      )
    },
    {
      id: 'notepad',
      title: 'Notepad - Untitled',
      isMinimized: false,
      isActive: false,
      initialPosition: { x: 150, y: 80 },
      content: (
        <div style={{ height: '100%' }}>
          <textarea 
            style={{ 
              width: '100%', 
              height: 'calc(100% - 40px)', 
              resize: 'none',
              border: 'none',
              outline: 'none',
              padding: '5px'
            }} 
            placeholder="Type here..."
          />
          <div style={{ 
            borderTop: '2px solid #c0c0c0',
            padding: '2px 8px',
            fontSize: '12px'
          }}>
            Ln 1, Col 1
          </div>
        </div>
      )
    },
    {
      id: 'calculator',
      title: 'Calculator',
      isMinimized: false,
      isActive: false,
      initialPosition: { x: 200, y: 100 },
      initialSize: { width: 250, height: 300 },
      content: (
        <div style={{ padding: '10px' }}>
          <input 
            type="text" 
            value="0" 
            readOnly 
            style={{ width: '95%', textAlign: 'right', marginBottom: '10px' }} 
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
            {['MC', 'MR', 'M+', 'M-', '7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '+/-', '.', '+'].map(btn => (
              <button key={btn}>{btn}</button>
            ))}
          </div>
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
      {windows.map(win => (
        <Window
          key={win.id}
          id={win.id}
          title={win.title}
          isActive={activeWindowId === win.id && !win.isMinimized}
          isMinimized={win.isMinimized}
          initialPosition={win.initialPosition}
          initialSize={win.initialSize}
          onFocus={handleWindowFocus}
          onMinimize={handleMinimize}
          onClose={handleClose}
        >
          {win.content}
        </Window>
      ))}
      
      <TaskBar 
        windows={windows}
        activeWindowId={activeWindowId}
        onWindowClick={handleWindowFocus}
        onRestore={handleRestore}
      />
    </div>
  );
}

export default App;
