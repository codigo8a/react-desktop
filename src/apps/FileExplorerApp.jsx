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
    const content = getFileContent(file.name);
    openApp('fileViewer', {
      file: {
        name: file.name.replace('.md', ''),
        content: content,
        folder: folderName
      }
    });
  };

  const renderTree = () => {
    return fileStructure.map((folder) => (
      <li key={folder.name}>
        <details open={expandedFolders[folder.name]} onToggle={() => toggleFolder(folder.name)}>
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
        padding: '8px',
        borderBottom: '2px solid #808080',
        background: '#c0c0c0'
      }}>
        <span style={{ fontWeight: 'bold' }}>Explorador de Archivos</span>
      </div>
      
      <div style={{ 
        flex: 1, 
        overflow: 'auto', 
        padding: '8px'
      }}>
        <ul className="tree-view">
          {renderTree()}
        </ul>
      </div>
      
      <div style={{ 
        padding: '4px 8px',
        borderTop: '2px solid #808080',
        fontSize: '11px'
      }}>
        {fileStructure.reduce((acc, f) => acc + (f.children?.length || 0), 0)} archivo(s)
      </div>
    </div>
  );
};
