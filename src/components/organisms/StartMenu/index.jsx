import { APPS } from '../../../apps/apps';
import './index.css';

export const StartMenu = ({ onClose, onOpenApp }) => {
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
        <button disabled>
          Programs
        </button>
        <button onClick={() => { onOpenApp('fileExplorer'); onClose(); }}>
          Documents
        </button>
        <button disabled>
          Settings
        </button>
        <button onClick={() => { onOpenApp('search'); onClose(); }}>
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
