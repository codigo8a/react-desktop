import { useState } from 'react';
import './index.css';

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
    <div className="notepad-container">
      <textarea 
        className="notepad-textarea"
        value={content}
        onChange={handleChange}
        placeholder="Type here..."
      />
      <div className="notepad-statusbar">
        Ln {line}, Col {col}
      </div>
    </div>
  );
};
