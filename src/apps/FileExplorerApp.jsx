import { useState, useMemo, useCallback } from 'react';
import { useFileSystem } from '../hooks/useFileSystem';
import { useDesktop } from '../context/DesktopContext';
import { useTranslation } from '../i18n/translations';

export const FileExplorerApp = () => {
  const { getFileStructure, getFileContent, getRawFileContent } = useFileSystem();
  const { openApp } = useDesktop();
  const [expandedFolders, setExpandedFolders] = useState({});
  const [activeTab, setActiveTab] = useState('table');
  const { t } = useTranslation();
  
  const fileStructure = useMemo(() => getFileStructure(), []);

  const toggleFolder = useCallback((folderName) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderName]: !prev[folderName]
    }));
  }, []);

  const handleFileClick = useCallback((file, folderName) => {
    const content = getRawFileContent(file.name, folderName);
    openApp('fileViewer', {
      file: {
        name: file.name.replace('.md', ''),
        content: content,
        folder: folderName,
        date: file.date
      },
      windowKey: `${folderName}/${file.name}`,
      title: file.name.replace('.md', '')
    });
  }, [getRawFileContent, openApp]);

  const renderTree = () => {
    return fileStructure.map((folder) => {
      const isOpen = expandedFolders[folder.name] === true;
      return (
        <li key={folder.name}>
          <div 
            style={{ cursor: 'pointer', userSelect: 'none' }}
            onClick={() => toggleFolder(folder.name)}
          >
            {isOpen ? '📂' : '📁'} {folder.name}
          </div>
          {isOpen && (
            <ul style={{ marginLeft: '20px' }}>
              {folder.children?.map((file) => (
                <li 
                  key={file.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFileClick(file, folder.name);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  📄 {file.name}
                </li>
              ))}
            </ul>
          )}
        </li>
      );
    });
  };

  const renderTable = () => {
    const allFiles = [];
    fileStructure.forEach(folder => {
      folder.children?.forEach(file => {
        allFiles.push({
          name: file.name,
          folder: folder.name,
          date: file.date,
          dateObj: new Date(file.date.split('/').reverse().join('-'))
        });
      });
    });

    allFiles.sort((a, b) => b.dateObj - a.dateObj);

    return (
      <div className="sunken-panel" style={{ flex: 1, overflow: 'auto' }}>
        <table className="interactive" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', width: '50%' }}>{t('name')}</th>
              <th style={{ textAlign: 'left', width: '25%' }}>{t('location')}</th>
              <th style={{ textAlign: 'left', width: '25%' }}>{t('date')}</th>
            </tr>
          </thead>
          <tbody>
            {allFiles.map((item, index) => (
              <tr 
                key={index}
                onClick={() => {
                  const content = getRawFileContent(item.name, item.folder);
                  openApp('fileViewer', {
                    file: {
                      name: item.name.replace('.md', ''),
                      content: content,
                      folder: item.folder,
                      date: item.date
                    },
                    windowKey: `${item.folder}/${item.name}`,
                    title: item.name.replace('.md', '')
                  });
                }}
                style={{ cursor: 'pointer' }}
              >
                <td>📄 {item.name}</td>
                <td>{item.folder}</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

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
          aria-selected={activeTab === 'table'}
          style={{ 
            background: activeTab === 'table' ? '#c0c0c0' : '#a0a0a0',
            padding: '2px 10px',
            marginRight: '2px',
            cursor: 'pointer'
          }}
        >
          <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('table'); }}>
            {t('table')}
          </a>
        </li>
        <li 
          role="tab" 
          aria-selected={activeTab === 'tree'}
          style={{ 
            background: activeTab === 'tree' ? '#c0c0c0' : '#a0a0a0',
            padding: '2px 10px',
            cursor: 'pointer'
          }}
        >
          <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('tree'); }}>
            {t('tree')}
          </a>
        </li>
      </menu>
      
      <div style={{ 
        flex: 1, 
        overflow: 'auto', 
        padding: '8px'
      }}>
        {activeTab === 'table' ? renderTable() : (
          <ul className="tree-view" key="tree">
            {renderTree()}
          </ul>
        )}
      </div>
      
      <div className="status-bar">
        <p className="status-bar-field">{fileStructure.length} {t('folder')}</p>
        <p className="status-bar-field">
          {fileStructure.reduce((acc, f) => acc + (f.children?.length || 0), 0)} {t('file')}
        </p>
        <p className="status-bar-field">{t('ready')}</p>
      </div>
    </div>
  );
};
