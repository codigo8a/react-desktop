export const TaskBar = ({ windows, activeWindowId, onWindowClick, onRestore }) => {
  return (
    <div className="taskbar" style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '30px',
      display: 'flex',
      alignItems: 'center',
      padding: '2px 4px',
      background: '#c0c0c0',
      borderTop: '2px solid #fff',
      zIndex: 1000
    }}>
      <button 
        className="start-button"
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '4px',
          fontWeight: 'bold',
          marginRight: '8px'
        }}
      >
        <img src="https://win98icons.alexmeub.com/icons/png/windows-0.png" width="16" height="16" alt="" />
        Start
      </button>
      
      <div style={{ 
        borderLeft: '2px solid #808080', 
        borderRight: '2px solid #fff',
        height: '20px',
        marginRight: '8px'
      }} />
      
      <div style={{ display: 'flex', gap: '4px', flex: 1 }}>
        {windows.map(win => (
          <button
            key={win.id}
            className={activeWindowId === win.id && !win.isMinimized ? 'active' : ''}
            style={{
              maxWidth: '150px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              textAlign: 'left'
            }}
            onClick={() => win.isMinimized ? onRestore(win.id) : onWindowClick(win.id)}
          >
            {win.title}
          </button>
        ))}
      </div>
      
      <div style={{ 
        borderLeft: '2px solid #808080', 
        borderRight: '2px solid #fff',
        height: '20px',
        marginLeft: '8px'
      }} />
      
      <div style={{ marginLeft: '8px', fontSize: '12px' }}>
        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};
