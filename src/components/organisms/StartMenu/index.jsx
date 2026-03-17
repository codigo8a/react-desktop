import { APPS, getAppList } from '../../../apps/apps';
import './index.css';

export const StartMenu = ({ onClose, onOpenApp }) => {
  const appList = getAppList();

  return (
    <div className="start-menu" onClick={(e) => e.stopPropagation()}>
      <div className="start-menu-sidebar">
        <span>Desktop</span>
      </div>
      <div className="start-menu-items">
        {appList.map(app => (
          <button 
            key={app.id}
            onClick={() => { onOpenApp(app.id); onClose(); }}
          >
            <span className="icon" style={{ marginRight: '8px' }}>{app.icon}</span>
            {app.title}
          </button>
        ))}
        <div className="start-menu-divider" />
        <button disabled>
          Programs
        </button>
        <button disabled>
          Documents
        </button>
        <button disabled>
          Settings
        </button>
        <button disabled>
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
