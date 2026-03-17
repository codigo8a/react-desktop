import { useState, useRef } from 'react';

export const ErrorWindow = ({ error, onReset }) => {
  const errorMessage = error?.message || 'An unknown error occurred';
  const errorStack = error?.stack || '';
  const [position] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, posX: 0, posY: 0 });

  const handleMouseDown = (e) => {
    if (e.target.closest('.title-bar')) {
      setIsDragging(true);
      dragStart.current = {
        x: e.clientX,
        y: e.clientY,
        posX: position.x,
        posY: position.y
      };
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      const el = document.querySelector('.error-window');
      if (el) {
        el.style.left = `${dragStart.current.posX + dx + 50}%`;
        el.style.top = `${dragStart.current.posY + 50}%`;
        el.style.transform = 'translate(0, 0)';
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className="error-window"
      style={{
        width: '400px',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10000,
        cursor: isDragging ? 'move' : 'default'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="window">
        <div className="title-bar">
          <div className="title-bar-text">Error</div>
          <div className="title-bar-controls">
            <button aria-label="Close" onClick={onReset} />
          </div>
        </div>
        <div className="window-body" style={{ textAlign: 'center', padding: '20px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            marginBottom: '15px'
          }}>
            <span style={{ fontSize: '32px' }}>⚠️</span>
            <span style={{ fontWeight: 'bold' }}>Application Error</span>
          </div>
          <p style={{ marginBottom: '15px' }}>{errorMessage}</p>
          <details style={{ textAlign: 'left', fontSize: '11px' }}>
            <summary>Technical Details</summary>
            <pre style={{ 
              background: '#c0c0c0', 
              padding: '10px', 
              overflow: 'auto',
              maxHeight: '150px',
              border: '2px inset #fff'
            }}>
              {errorStack}
            </pre>
          </details>
        </div>
      </div>
    </div>
  );
};
