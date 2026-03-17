import { useState } from 'react';
import { useFileSystem } from '../hooks/useFileSystem';
import { useDesktop } from '../context/DesktopContext';

export const FileExplorerApp = () => {
  const { getFileStructure, getFileContent } = useFileSystem();
  const { openApp } = useDesktop();
  const [expandedFolders, setExpandedFolders] = useState({});
  
  const fileStructure = getFileStructure();

  const toggleFolder = (folderName) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderName]: !prev[folderName]
    }));
  };

  const handleFileClick = (file, folderName) => {
    const content = getFileContent(file.name, folderName);
    openApp('fileViewer', {
      file: {
        name: file.name.replace('.md', ''),
        content: content,
        folder: folderName
      },
      windowKey: `${folderName}/${file.name}`,
      title: file.name.replace('.md', '')
    });
  };

  const renderTree = () => {
    return fileStructure.map((folder) => (
      <li key={folder.name}>
        <details open={expandedFolders[folder.name] !== false} onToggle={() => toggleFolder(folder.name)}>
          <summary style={{ cursor: 'pointer' }}>📁 {folder.name}</summary>
          <ul>
            {folder.children?.map((file) => (
              <li 
                key={file.name}
                onClick={() => handleFileClick(file, folder.name)}
                style={{ cursor: 'pointer' }}
              >
                📄 {file.name}
              </li>
            ))}
          </ul>
        </details>
      </li>
    ));
  };

  return (
    <div style={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      background: '#c0c0c0'
    }}>
      <div style={{ 
        flex: 1, 
        overflow: 'auto', 
        padding: '8px'
      }}>
        <ul className="tree-view">
          {renderTree()}
        </ul>
      </div>
      
      <div className="status-bar">
        <p className="status-bar-field">{fileStructure.length} carpeta(s)</p>
        <p className="status-bar-field">
          {fileStructure.reduce((acc, f) => acc + (f.children?.length || 0), 0)} archivo(s)
        </p>
        <p className="status-bar-field">Listo</p>
      </div>
    </div>
  );
};
