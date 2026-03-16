import { useState } from 'react';

export const NotepadApp = () => {
  const [content, setContent] = useState('');
  const [line, setLine] = useState(1);
  const [col, setCol] = useState(1);

  const handleChange = (e) => {
    setContent(e.target.value);
    const text = e.target.value;
    const lines = text.split('\n');
    setLine(lines.length);
    setCol(lines[lines.length - 1].length + 1);
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <textarea 
        style={{ 
          flex: 1,
          width: '100%', 
          resize: 'none',
          border: 'none',
          outline: 'none',
          padding: '5px',
          fontFamily: 'monospace',
          fontSize: '14px'
        }} 
        value={content}
        onChange={handleChange}
        placeholder="Type here..."
      />
      <div style={{ 
        borderTop: '2px solid #c0c0c0',
        padding: '2px 8px',
        fontSize: '12px'
      }}>
        Ln {line}, Col {col}
      </div>
    </div>
  );
};
