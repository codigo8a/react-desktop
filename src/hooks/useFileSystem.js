import { FILE_STRUCTURE, FILE_CONTENT } from '../data/fileStructure';

export const useFileSystem = () => {
  const getFileStructure = () => {
    return FILE_STRUCTURE;
  };

  const getFileContent = (filename) => {
    return FILE_CONTENT[filename] || 'Archivo no encontrado';
  };

  const getAllFiles = () => {
    const files = [];
    FILE_STRUCTURE.forEach(folder => {
      if (folder.children) {
        folder.children.forEach(file => {
          files.push({
            folder: folder.name,
            name: file.name,
            content: FILE_CONTENT[file.name] || ''
          });
        });
      }
    });
    return files;
  };

  return {
    getFileStructure,
    getFileContent,
    getAllFiles
  };
};
