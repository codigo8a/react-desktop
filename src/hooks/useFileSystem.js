import { useCallback } from 'react';

const files = import.meta.glob('../data/files/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
});

const extractDate = (content) => {
  if (!content) return '01/01/2026';
  const match = content.match(/Fecha:\s*(\d{1,2}\/\d{1,2}\/\d{4})/);
  return match ? match[1] : '01/01/2026';
};

const extractContentWithoutDate = (content) => {
  if (!content) return '';
  return content.replace(/^Fecha:\s*\d{1,2}\/\d{1,2}\/\d{4}\n?/gm, '');
};

const extractRawContent = (content) => {
  if (!content) return '';
  return content;
};

export const useFileSystem = () => {
  const getFileStructure = useCallback(() => {
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
  }, []);

  const getFileContent = useCallback((filename, folderName) => {
    const path = `../data/files/${folderName}/${filename}`;
    const content = files[path];
    return content ? extractContentWithoutDate(content) : 'File not found';
  }, []);

  const getRawFileContent = useCallback((filename, folderName) => {
    const path = `../data/files/${folderName}/${filename}`;
    const content = files[path];
    return content ? extractRawContent(content) : 'File not found';
  }, []);

  const getFileWithDate = useCallback((filename, folderName) => {
    const path = `../data/files/${folderName}/${filename}`;
    const content = files[path];
    if (!content) return null;
    return {
      content: extractContentWithoutDate(content),
      rawContent: extractRawContent(content),
      date: extractDate(content)
    };
  }, []);

  const getAllFiles = useCallback(() => {
    const result = [];
    
    Object.entries(files).forEach(([path, content]) => {
      const parts = path.replace('../data/files/', '').split('/');
      const folder = parts[0];
      const filename = parts[1];
      
      result.push({
        folder,
        name: filename,
        content: extractContentWithoutDate(content),
        rawContent: extractRawContent(content),
        date: extractDate(content)
      });
    });
    
    return result;
  }, []);

  const findFileByUrl = useCallback((folderName, fileName) => {
    const allFiles = getAllFiles();
    const targetFolder = folderName.toLowerCase();
    const targetFile = fileName.toLowerCase().endsWith('.md') ? fileName.toLowerCase() : `${fileName.toLowerCase()}.md`;
    
    return allFiles.find(f => 
      f.folder.toLowerCase() === targetFolder && 
      f.name.toLowerCase() === targetFile
    );
  }, [getAllFiles]);

  return {
    getFileStructure,
    getFileContent,
    getRawFileContent,
    getFileWithDate,
    getAllFiles,
    findFileByUrl
  };
};
