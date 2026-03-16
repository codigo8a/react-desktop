import { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { TitleBar } from '../molecules/TitleBar';

export const Window = ({ 
  id, 
  title, 
  children, 
  initialPosition = { x: 50, y: 50 },
  initialSize = { width: 400, height: 300 },
  isActive = false,
  isMinimized = false,
  onFocus,
  onMinimize,
  onMaximize,
  onClose 
}) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [size] = useState(initialSize);
  const nodeRef = useRef(null);

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    onMaximize?.(id);
  };

  if (isMinimized) {
    return null;
  }

  return (
    <Draggable
      handle=".title-bar"
      disabled={isMaximized}
      defaultPosition={initialPosition}
      nodeRef={nodeRef}
    >
      <div 
        ref={nodeRef}
        className={`window ${isActive ? 'active' : ''}`}
        style={{
          position: 'absolute',
          width: isMaximized ? 'calc(100% - 20px)' : size.width,
          height: isMaximized ? 'calc(100% - 100px)' : size.height,
          zIndex: isActive ? 100 : 10,
          left: isMaximized ? '10px' : undefined,
          top: isMaximized ? '10px' : undefined,
        }}
        onClick={() => onFocus?.(id)}
      >
        <TitleBar 
          title={title}
          onMinimize={() => onMinimize?.(id)}
          onMaximize={handleMaximize}
          onClose={() => onClose?.(id)}
          active={isActive}
        />
        <div className="window-body" style={{ height: 'calc(100% - 20px)' }}>
          {children}
        </div>
      </div>
    </Draggable>
  );
};

