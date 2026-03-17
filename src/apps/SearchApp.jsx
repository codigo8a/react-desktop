import { useState } from 'react';
import { useFileSystem } from '../hooks/useFileSystem';
import { useDesktop } from '../context/DesktopContext';

export const SearchApp = () => {
  const { getAllFiles, getRawFileContent } = useFileSystem();
  const { openApp } = useDesktop();
  const [searchTerm, setSearchTerm] = useState('');

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
          <label>Buscar:</label>
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 1 }}
            placeholder="Escribe una palabra..."
          />
        </div>
      </div>

      <div className="sunken-panel" style={{ flex: 1, overflow: 'auto', margin: '0 8px 8px 8px' }}>
        {searchTerm.trim() === '' ? (
          <div style={{ padding: '16px', color: '#666' }}>
            Escribe una palabra para buscar en los archivos
          </div>
        ) : results.length === 0 ? (
          <div style={{ padding: '16px', color: '#666' }}>
            No se encontraron archivos con "{searchTerm}"
          </div>
        ) : (
          <table className="interactive" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Nombre</th>
                <th style={{ textAlign: 'left' }}>Ubicacion</th>
                <th style={{ textAlign: 'left' }}>Tipo</th>
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
                    <td>{nameMatch ? 'Titulo' : 'Contenido'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <div className="status-bar">
        <p className="status-bar-field">
          {searchTerm.trim() === '' ? 'Sin busqueda' : `${results.length} resultado(s)`}
        </p>
        <p className="status-bar-field">Listo</p>
      </div>
    </div>
  );
};