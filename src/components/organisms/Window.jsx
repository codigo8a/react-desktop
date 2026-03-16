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
  centered = false,
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
      position={centered ? null : initialPosition}
      nodeRef={nodeRef}
    >
      <div 
        ref={nodeRef}
        className={`window ${isActive ? 'active' : ''}`}
        style={{
          position: 'absolute',
          width: isMaximized ? '100%' : size.width,
          height: isMaximized ? 'calc(100% - 30px)' : size.height,
          zIndex: isMaximized ? 999 : (isActive ? 100 : 10),
          left: isMaximized ? '0' : centered ? '50%' : initialPosition.x,
          top: isMaximized ? '30px' : centered ? '50%' : initialPosition.y,
          transform: centered && !isMaximized ? 'translate(-50%, -50%)' : undefined,
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

