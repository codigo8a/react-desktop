export const FileViewerApp = ({ file }) => {
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

  const title = file.folder ? `${file.folder}/${file.name}` : `${file.name}.md`;

  return (
    <div style={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      background: '#fff'
    }}>
      <div style={{ 
        padding: '8px',
        borderBottom: '2px solid #c0c0c0',
        background: '#c0c0c0',
        fontWeight: 'bold'
      }}>
        {title}
      </div>
      
      <pre style={{ 
        flex: 1, 
        overflow: 'auto', 
        padding: '12px',
        margin: 0,
        fontFamily: 'monospace',
        fontSize: '13px',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word'
      }}>
        {file.content}
      </pre>
    </div>
  );
};
