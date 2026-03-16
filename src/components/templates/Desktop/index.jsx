import { TaskBar } from './TaskBar';

export const Desktop = ({ windows, activeWindowId, onWindowFocus, onMinimize, onRestore }) => {
  return (
    <div className="desktop" style={{
      width: '100vw',
      height: 'calc(100vh - 30px)',
      background: '#008080',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {windows.map(win => (
        <div key={win.id}>
          {win.content}
        </div>
      ))}
      <TaskBar 
        windows={windows} 
        activeWindowId={activeWindowId}
        onWindowClick={onWindowFocus}
        onMinimize={onMinimize}
        onRestore={onRestore}
      />
    </div>
  );
};
