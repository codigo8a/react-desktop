import './index.css';

export const WindowControls = ({ onMinimize, onMaximize, onClose }) => {
  return (
    <div className="title-bar-controls">
      <button aria-label="Minimize" onClick={onMinimize} />
      <button aria-label="Maximize" onClick={onMaximize} />
      <button aria-label="Close" onClick={onClose} />
    </div>
  );
};
