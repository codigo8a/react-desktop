import './index.css';
import { WindowControls } from '../WindowControls';

export const TitleBar = ({ title, onMinimize, onMaximize, onClose, active = true }) => {
  return (
    <div className={`title-bar ${active ? '' : 'inactive'}`}>
      <div className="title-bar-text">{title}</div>
      <WindowControls 
        onMinimize={onMinimize} 
        onMaximize={onMaximize} 
        onClose={onClose} 
      />
    </div>
  );
};
