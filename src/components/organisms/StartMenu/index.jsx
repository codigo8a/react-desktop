import './index.css';

export const StartMenu = ({ onClose, onOpenWelcome }) => {
  return (
    <div className="start-menu" onClick={(e) => e.stopPropagation()}>
      <div className="start-menu-sidebar">
        <span>React Desktop</span>
      </div>
      <div className="start-menu-items">
        <button onClick={() => { onOpenWelcome(); onClose(); }}>
          Welcome
        </button>
        <div className="start-menu-divider" />
        <button disabled onClick={onClose}>
          Programs
        </button>
        <button disabled onClick={onClose}>
          Documents
        </button>
        <button disabled onClick={onClose}>
          Settings
        </button>
        <button disabled onClick={onClose}>
          Find
        </button>
        <div className="start-menu-divider" />
        <button disabled onClick={onClose}>
          Help
        </button>
        <button disabled onClick={onClose}>
          Run...
        </button>
        <div className="start-menu-divider" />
        <button disabled onClick={onClose}>
          Shut Down...
        </button>
      </div>
    </div>
  );
};
