import { useDesktop } from '../context/DesktopContext';

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
    <div style={{
      position: 'absolute',
      top: '34px',
      left: '4px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      zIndex: 1
    }}>
      {DESKTOP_ICONS.map((icon) => (
        <div
          key={icon.id}
          onClick={() => handleIconClick(icon.id)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '64px',
            cursor: 'pointer',
            padding: '4px',
          }}
        >
          <div style={{ fontSize: '32px' }}>{icon.icon}</div>
          <span style={{
            color: '#fff',
            fontSize: '11px',
            textAlign: 'center',
            textShadow: '1px 1px 1px #000',
            fontFamily: '"MS Sans Serif", Arial, sans-serif'
          }}>
            {icon.label}
          </span>
        </div>
      ))}
    </div>
  );
};
