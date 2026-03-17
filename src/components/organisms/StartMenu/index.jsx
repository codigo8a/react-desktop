import { useState } from 'react';
import { APPS } from '../../../apps/apps';
import { useTranslation } from '../../../i18n/translations';
import './index.css';

export const StartMenu = ({ onClose, onOpenApp }) => {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const { t } = useTranslation();

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
              {t('programs')}
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
          {t('documents')}
        </button>
        <button onClick={() => { onOpenApp('settings'); onClose(); }}>
          {t('settings')}
        </button>
        <button onClick={() => { onOpenApp('search'); onClose(); }}>
          <span className="icon" style={{ marginRight: '8px' }}>🔍</span>
          {t('find')}
        </button>
        <div className="start-menu-divider" />
        <button disabled>
          {t('help')}
        </button>
        <button disabled>
          {t('run')}...
        </button>
        <div className="start-menu-divider" />
        <button disabled>
          {t('shutDown')}...
        </button>
      </div>
    </div>
  );
};
