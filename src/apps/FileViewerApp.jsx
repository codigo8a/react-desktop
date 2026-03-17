import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const markdownStyles = {
  padding: '16px',
  fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  fontSize: '14px',
  lineHeight: '1.6',
  color: '#000'
};

const MarkdownComponents = {
  h1: ({ children }) => (
    <h1 style={{ 
      fontSize: '24px', 
      fontWeight: 'bold', 
      marginBottom: '12px',
      marginTop: '20px',
      paddingBottom: '8px',
      borderBottom: '2px solid #c0c0c0'
    }}>{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 style={{ 
      fontSize: '20px', 
      fontWeight: 'bold', 
      marginBottom: '10px',
      marginTop: '18px',
      color: '#000080'
    }}>{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 style={{ 
      fontSize: '16px', 
      fontWeight: 'bold', 
      marginBottom: '8px',
      marginTop: '14px'
    }}>{children}</h3>
  ),
  p: ({ children }) => (
    <p style={{ 
      marginBottom: '12px',
      marginTop: '8px'
    }}>{children}</p>
  ),
  ul: ({ children }) => (
    <ul style={{ 
      marginLeft: '24px',
      marginBottom: '12px',
      listStyleType: 'disc'
    }}>{children}</ul>
  ),
  ol: ({ children }) => (
    <ol style={{ 
      marginLeft: '24px',
      marginBottom: '12px',
      listStyleType: 'decimal'
    }}>{children}</ol>
  ),
  li: ({ children }) => (
    <li style={{ 
      marginBottom: '4px'
    }}>{children}</li>
  ),
  code: ({ children }) => (
    <code style={{
      backgroundColor: '#ffffcc',
      padding: '2px 6px',
      fontFamily: 'monospace',
      fontSize: '13px',
      border: '1px solid #c0c0c0'
    }}>{children}</code>
  ),
  pre: ({ children }) => (
    <pre style={{
      backgroundColor: '#ffffcc',
      padding: '12px',
      fontFamily: 'monospace',
      fontSize: '13px',
      border: '2px inset #c0c0c0',
      overflow: 'auto',
      marginBottom: '12px',
      marginTop: '8px'
    }}>{children}</pre>
  ),
  blockquote: ({ children }) => (
    <blockquote style={{
      borderLeft: '4px solid #000080',
      paddingLeft: '16px',
      marginLeft: '0',
      marginBottom: '12px',
      marginTop: '8px',
      color: '#444',
      fontStyle: 'italic'
    }}>{children}</blockquote>
  ),
  strong: ({ children }) => (
    <strong style={{ fontWeight: 'bold' }}>{children}</strong>
  ),
  em: ({ children }) => (
    <em style={{ fontStyle: 'italic' }}>{children}</em>
  ),
  a: ({ children, href }) => (
    <a href={href} style={{ 
      color: '#0000ff',
      textDecoration: 'underline'
    }}>{children}</a>
  ),
  hr: () => (
    <hr style={{ 
      border: 'none',
      borderTop: '1px solid #c0c0c0',
      margin: '16px 0'
    }} />
  )
};

export const FileViewerApp = ({ file }) => {
  const [activeTab, setActiveTab] = useState('preview');

  if (!file) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center',
        color: '#808080' 
      }}>
        No hay archivo seleccionado
      </div>
    );
  }

  return (
    <div style={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      background: '#c0c0c0'
    }}>
      <menu role="tablist" style={{ margin: 0, padding: '2px', display: 'flex' }}>
        <li 
          role="tab" 
          aria-selected={activeTab === 'preview'}
          style={{ 
            background: activeTab === 'preview' ? '#c0c0c0' : '#a0a0a0',
            padding: '2px 10px',
            marginRight: '2px',
            cursor: 'pointer'
          }}
        >
          <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('preview'); }}>
            Vista Previa
          </a>
        </li>
        <li 
          role="tab" 
          aria-selected={activeTab === 'source'}
          style={{ 
            background: activeTab === 'source' ? '#c0c0c0' : '#a0a0a0',
            padding: '2px 10px',
            cursor: 'pointer'
          }}
        >
          <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('source'); }}>
            Codigo Fuente
          </a>
        </li>
      </menu>
      
      <div style={{ 
        flex: 1, 
        overflow: 'auto', 
        background: '#fff',
        margin: '4px'
      }}>
        {file.date && (
          <div style={{ 
            padding: '4px 8px', 
            background: '#ffffcc', 
            borderBottom: '1px solid #c0c0c0',
            fontSize: '12px',
            fontFamily: 'monospace'
          }}>
            Fecha: {file.date}
          </div>
        )}
        {activeTab === 'preview' ? (
          <div style={markdownStyles}>
            <ReactMarkdown components={MarkdownComponents}>
              {file.content}
            </ReactMarkdown>
          </div>
        ) : (
          <pre style={{ 
            padding: '12px',
            margin: 0,
            fontFamily: 'monospace',
            fontSize: '13px',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
          }}>
            {file.content}
          </pre>
        )}
      </div>
    </div>
  );
};
