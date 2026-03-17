import { useState, useRef } from 'react';
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
  zIndex = 10,
  isMaximized = false,
  onFocus,
  onMinimize,
  onMaximize,
  onClose 
}) => {
  const [size] = useState(initialSize);
  const nodeRef = useRef(null);

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
      <div className="window-body" style={{ height: 'calc(100% - 20px)' }}>
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

  const getInitialPosition = () => {
    if (centered) {
      return {
        x: (window.innerWidth - size.width) / 2,
        y: (window.innerHeight - size.height) / 2
      };
    }
    return initialPosition;
  };

  return (
    <Draggable
      handle=".title-bar"
      defaultPosition={getInitialPosition()}
      nodeRef={nodeRef}
    >
      <div 
        ref={nodeRef}
        className={`window ${isActive ? 'active' : ''}`}
        style={{
          position: 'absolute',
          width: size.width,
          height: size.height,
          zIndex,
        }}
        onClick={() => onFocus?.(id)}
      >
        {renderContent()}
      </div>
    </Draggable>
  );
};
