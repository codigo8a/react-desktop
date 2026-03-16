import { useState, useRef, useMemo } from 'react';
import Draggable from 'react-draggable';
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
  onFocus,
  onMinimize,
  onMaximize,
  onClose 
}) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [size] = useState(initialSize);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const nodeRef = useRef(null);

  const centerPos = useMemo(() => {
    if (!centered || isMaximized) return { x: 0, y: 0 };
    return {
      x: (window.innerWidth - size.width) / 2,
      y: (window.innerHeight - size.height) / 2
    };
  }, [centered, isMaximized, size.width, size.height]);

  useState(() => {
    if (centered && !isMaximized) {
      setPosition(centerPos);
    }
  }, [centered, isMaximized]);

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    onMaximize?.(id);
  };

  if (isMinimized) {
    return null;
  }

  if (isMaximized) {
    return (
      <div 
        className={`window ${isActive ? 'active' : ''}`}
        style={{
          position: 'absolute',
          width: '100%',
          height: 'calc(100% - 30px)',
          zIndex: 999,
          left: '0px',
          top: '30px',
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
    );
  }

  const isDraggable = true;

  return (
    <Draggable
      handle=".title-bar"
      disabled={!isDraggable}
      position={isDraggable ? (centered ? position : initialPosition) : null}
      nodeRef={nodeRef}
      onStop={(_e, data) => {
        if (centered) {
          setPosition({ x: data.x, y: data.y });
        }
      }}
    >
      <div 
        ref={nodeRef}
        className={`window ${isActive ? 'active' : ''}`}
        style={{
          position: 'absolute',
          width: isMaximized ? '100%' : size.width,
          height: isMaximized ? 'calc(100% - 30px)' : size.height,
          zIndex: isMaximized ? 999 : (isActive ? 100 : 10),
          left: isMaximized ? '0px' : undefined,
          top: isMaximized ? '30px' : undefined,
          margin: isMaximized ? '0' : undefined,
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
