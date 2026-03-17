const files = import.meta.glob('../data/files/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
});

const extractDate = (content) => {
  if (!content) return '01/01/2026';
  const match = content.match(/Fecha:\s*(\d{2}\/\d{2}\/\d{4})/);
  return match ? match[1] : '01/01/2026';
};

const extractContentWithoutDate = (content) => {
  if (!content) return '';
  return content.replace(/^Fecha:\s*\d{2}\/\d{2}\/\d{4}\n?/gm, '');
};

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
        content: extractContentWithoutDate(content),
        date: extractDate(content)
      });
    });
    
    return Object.entries(structure).map(([name, children]) => ({
      name,
      type: 'folder',
      children: children.map(c => ({
        name: c.name + '.md',
        type: 'file',
        date: c.date
      }))
    }));
  };

  const getFileContent = (filename, folderName) => {
    const path = `../data/files/${folderName}/${filename}`;
    const content = files[path];
    return content ? extractContentWithoutDate(content) : 'Archivo no encontrado';
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
        content: extractContentWithoutDate(content),
        date: extractDate(content)
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
