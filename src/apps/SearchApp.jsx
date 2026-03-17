import { useState } from 'react';
import { useFileSystem } from '../hooks/useFileSystem';
import { useDesktop } from '../context/DesktopContext';
import { useTranslation } from '../i18n/translations';

export const SearchApp = () => {
  const { getAllFiles, getRawFileContent } = useFileSystem();
  const { openApp } = useDesktop();
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useTranslation();

  const allFiles = getAllFiles();

  const results = searchTerm.trim() 
    ? allFiles.filter(file => {
        const term = searchTerm.toLowerCase();
        const nameMatch = file.name.toLowerCase().includes(term);
        const contentMatch = file.content.toLowerCase().includes(term);
        return nameMatch || contentMatch;
      })
    : [];

  const handleFileClick = (file) => {
    const content = getRawFileContent(file.name, file.folder);
    openApp('fileViewer', {
      file: {
        name: file.name.replace('.md', ''),
        content: content,
        folder: file.folder,
        date: file.date
      },
      windowKey: `${file.folder}/${file.name}`,
      title: file.name.replace('.md', '')
    });
  };

  return (
    <div style={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      background: '#c0c0c0'
    }}>
      <div style={{ padding: '8px' }}>
        <div className="field-row" style={{ marginBottom: '8px' }}>
          <label>{t('search')}:</label>
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 1 }}
            placeholder={t('searchPlaceholder')}
          />
        </div>
      </div>

      <div className="sunken-panel" style={{ flex: 1, overflow: 'auto', margin: '0 8px 8px 8px' }}>
        {searchTerm.trim() === '' ? (
          <div style={{ padding: '16px', color: '#666' }}>
            {t('typeToSearch')}
          </div>
        ) : results.length === 0 ? (
          <div style={{ padding: '16px', color: '#666' }}>
            {t('noFilesFound')} "{searchTerm}"
          </div>
        ) : (
          <table className="interactive" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>{t('name')}</th>
                <th style={{ textAlign: 'left' }}>{t('location')}</th>
                <th style={{ textAlign: 'left' }}>{t('type')}</th>
              </tr>
            </thead>
            <tbody>
              {results.map((file, index) => {
                const nameMatch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
                return (
                  <tr 
                    key={index}
                    onClick={() => handleFileClick(file)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>📄 {file.name}</td>
                    <td>{file.folder}</td>
                    <td>{nameMatch ? t('title') : t('content')}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <div className="status-bar">
        <p className="status-bar-field">
          {searchTerm.trim() === '' ? t('noSearch') : `${results.length} ${t('results')}`}
        </p>
        <p className="status-bar-field">{t('ready')}</p>
      </div>
    </div>
  );
};
