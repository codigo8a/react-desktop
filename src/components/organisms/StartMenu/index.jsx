import { useState } from 'react';
import { APPS } from '../../../apps/apps';
import './index.css';

export const StartMenu = ({ onClose, onOpenApp }) => {
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggleSubmenu = (menu) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  return (
    <div className="start-menu" onClick={(e) => e.stopPropagation()}>
      <div className="start-menu-sidebar">
        <span>Desktop</span>
      </div>
      <div className="start-menu-items">
        <button 
          onClick={() => { onOpenApp('welcome'); onClose(); }}
        >
          <span className="icon" style={{ marginRight: '8px' }}>{APPS.welcome.icon}</span>
          {APPS.welcome.title}
        </button>
        <div className="start-menu-divider" />
          <div className="menu-item-with-submenu">
            <button onClick={() => toggleSubmenu('programs')}>
              <span className="icon" style={{ marginRight: '8px' }}>🗃️</span>
              Programs
            <span style={{ marginLeft: 'auto' }}>▶</span>
          </button>
          {openSubmenu === 'programs' && (
            <div className="submenu">
              <button onClick={() => { onOpenApp('notepad'); onClose(); }}>
                <span className="icon" style={{ marginRight: '8px' }}>{APPS.notepad.icon}</span>
                {APPS.notepad.title}
              </button>
            </div>
          )}
        </div>
        <button onClick={() => { onOpenApp('fileExplorer'); onClose(); }}>
          <span className="icon" style={{ marginRight: '8px' }}>{APPS.fileExplorer.icon}</span>
          Documents
        </button>
        <button disabled>
          Settings
        </button>
        <button onClick={() => { onOpenApp('search'); onClose(); }}>
          <span className="icon" style={{ marginRight: '8px' }}>🔍</span>
          Find
        </button>
        <div className="start-menu-divider" />
        <button disabled>
          Help
        </button>
        <button disabled>
          Run...
        </button>
        <div className="start-menu-divider" />
        <button disabled>
          Shut Down...
        </button>
      </div>
    </div>
  );
};
