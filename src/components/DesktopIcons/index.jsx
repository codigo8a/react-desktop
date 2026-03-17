import { useDesktop } from '../../context/DesktopContext';
import './index.css';

const DESKTOP_ICONS = [
  { id: 'myComputer', icon: '💻', label: 'My Computer' },
  { id: 'recycleBin', icon: '🗑️', label: 'Recycle Bin' },
  { id: 'myDocuments', icon: '📁', label: 'My Documents' },
];

export const DesktopIcons = () => {
  const { openApp } = useDesktop();

  const handleIconClick = (iconId) => {
    if (iconId === 'myDocuments') {
      openApp('fileExplorer');
    }
  };

  return (
    <div className="desktop-icons">
      {DESKTOP_ICONS.map((icon) => (
        <div
          key={icon.id}
          className="desktop-icon"
          onClick={() => handleIconClick(icon.id)}
        >
          <div className="desktop-icon-image">{icon.icon}</div>
          <span className="desktop-icon-label">
            {icon.label}
          </span>
        </div>
      ))}
    </div>
  );
};
