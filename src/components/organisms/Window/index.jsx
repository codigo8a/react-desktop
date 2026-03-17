import { useState, useRef } from 'react';
import { TitleBar } from '../../molecules/TitleBar';
import './index.css';

export const Window = ({ 
  id, 
  title, 
  children, 
  initialPosition = { x: 50, y: 50 },
  initialSize = { width: 400, height: 300 },
  isActive = false,
  isMinimized = false,
  centered = false,
  zIndex = 10,
  isMaximized = false,
  currentPosition = null,
  onFocus,
  onMinimize,
  onMaximize,
  onClose,
  onMove
}) => {
  const [size] = useState(initialSize);
  const [position, setPosition] = useState(() => {
    if (currentPosition) return currentPosition;
    if (centered) {
      return {
        x: (window.innerWidth - initialSize.width) / 2,
        y: (window.innerHeight - initialSize.height) / 2
      };
    }
    return initialPosition;
  });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, posX: 0, posY: 0 });

  const handleMinimize = () => {
    onMinimize?.(id);
  };

  if (isMinimized) {
    return null;
  }

  const renderContent = () => (
    <>
      <TitleBar 
        title={title}
        onMinimize={handleMinimize}
        onMaximize={() => onMaximize?.(id)}
        onClose={() => onClose?.(id)}
        active={isActive}
      />
      <div className="window-body">
        {children}
      </div>
    </>
  );

  if (isMaximized) {
    return (
      <div 
        className={`window ${isActive ? 'active' : ''}`}
        style={{
          position: 'absolute',
          width: '100%',
          height: 'calc(100% - 30px)',
          zIndex,
          left: '0px',
          top: '30px',
        }}
        onClick={() => onFocus?.(id)}
      >
        {renderContent()}
      </div>
    );
  }

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
      setPosition({
        x: dragStart.current.posX + dx,
        y: dragStart.current.posY + dy
      });
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      onMove?.(id, position);
    }
  };

  return (
    <div 
      className={`window ${isActive ? 'active' : ''}`}
      style={{
        position: 'absolute',
        width: size.width,
        height: size.height,
        zIndex,
        left: position.x,
        top: position.y,
        cursor: isDragging ? 'move' : 'default',
        userSelect: isDragging ? 'none' : 'auto'
      }}
      onClick={() => onFocus?.(id)}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {renderContent()}
    </div>
  );
};
