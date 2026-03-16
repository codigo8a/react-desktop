import Draggable from 'react-draggable';

export const ErrorWindow = ({ error, onReset }) => {
  const errorMessage = error?.message || 'An unknown error occurred';
  const errorStack = error?.stack || '';

  return (
    <Draggable handle=".title-bar">
      <div className="window" style={{
        width: '400px',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10000
      }}>
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
    </Draggable>
  );
};
