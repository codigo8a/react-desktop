const files = import.meta.glob('../data/files/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
});

export const useFileSystem = () => {
  const getFileStructure = () => {
    const structure = {};
    
    Object.entries(files).forEach(([path, content]) => {
      const parts = path.replace('../data/files/', '').split('/');
      const folder = parts[0];
      const filename = parts[1].replace('.md', '');
      
      if (!structure[folder]) {
        structure[folder] = [];
      }
      
      structure[folder].push({
        name: filename,
        content: content || ''
      });
    });
    
    return Object.entries(structure).map(([name, children]) => ({
      name,
      type: 'folder',
      children: children.map(c => ({
        name: c.name + '.md',
        type: 'file'
      }))
    }));
  };

  const getFileContent = (filename, folderName) => {
    const path = `../data/files/${folderName}/${filename}`;
    return files[path] || 'Archivo no encontrado';
  };

  const getAllFiles = () => {
    const result = [];
    
    Object.entries(files).forEach(([path, content]) => {
      const parts = path.replace('../data/files/', '').split('/');
      const folder = parts[0];
      const filename = parts[1];
      
      result.push({
        folder,
        name: filename,
        content: content || ''
      });
    });
    
    return result;
  };

  return {
    getFileStructure,
    getFileContent,
    getAllFiles
  };
};
