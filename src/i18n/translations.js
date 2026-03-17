import { useLanguage } from '../context/LanguageContext';

const translations = {
  welcome: {
    es: "Bienvenido a juandavid.site",
    en: "Welcome to juandavid.site"
  },
  welcomeTip: {
    es: "¿Sabías que...?",
    en: "Did you know...?"
  },
  nextTip: {
    es: "Siguiente Tip",
    en: "Next Tip"
  },
  whatsNew: {
    es: "Qué hay de nuevo",
    en: "What's New"
  },
  onlineRegistration: {
    es: "Registro en línea",
    en: "Online Registration"
  },
  close: {
    es: "Cerrar",
    en: "Close"
  },
  showWelcomeScreen: {
    es: "Mostrar esta pantalla de bienvenida al iniciar Windows",
    en: "Show this Welcome Screen next time you start Windows"
  },
  settings: {
    es: "Configuración",
    en: "Settings"
  },
  language: {
    es: "Idioma",
    en: "Language"
  },
  selectLanguage: {
    es: "Seleccione el idioma:",
    en: "Select language:"
  },
  spanish: {
    es: "Español",
    en: "Spanish"
  },
  english: {
    es: "Inglés",
    en: "English"
  },
  apply: {
    es: "Aceptar",
    en: "Apply"
  },
  cancel: {
    es: "Cancelar",
    en: "Cancel"
  },
  search: {
    es: "Buscar",
    en: "Search"
  },
  searchPlaceholder: {
    es: "Escribe una palabra...",
    en: "Type a word..."
  },
  typeToSearch: {
    es: "Escribe una palabra para buscar en los archivos",
    en: "Type a word to search in files"
  },
  noFilesFound: {
    es: "No se encontraron archivos con",
    en: "No files found matching"
  },
  name: {
    es: "Nombre",
    en: "Name"
  },
  location: {
    es: "Ubicación",
    en: "Location"
  },
  date: {
    es: "Fecha",
    en: "Date"
  },
  type: {
    es: "Tipo",
    en: "Type"
  },
  title: {
    es: "Título",
    en: "Title"
  },
  content: {
    es: "Contenido",
    en: "Content"
  },
  ready: {
    es: "Listo",
    en: "Ready"
  },
  noSearch: {
    es: "Sin búsqueda",
    en: "No search"
  },
  results: {
    es: "resultado(s)",
    en: "result(s)"
  },
  preview: {
    es: "Vista previa",
    en: "Preview"
  },
  source: {
    es: "Código fuente",
    en: "Source"
  },
  table: {
    es: "Tabla",
    en: "Table"
  },
  tree: {
    es: "Árbol",
    en: "Tree"
  },
  programs: {
    es: "Programas",
    en: "Programs"
  },
  documents: {
    es: "Documentos",
    en: "Documents"
  },
  find: {
    es: "Buscar",
    en: "Find"
  },
  help: {
    es: "Ayuda",
    en: "Help"
  },
  run: {
    es: "Ejecutar",
    en: "Run"
  },
  shutDown: {
    es: "Apagar",
    en: "Shut Down"
  },
  fileNotFound: {
    es: "Archivo no encontrado",
    en: "File not found"
  },
  welcomeApp: {
    es: "Bienvenida",
    en: "Welcome"
  },
  notepad: {
    es: "Bloc de notas",
    en: "Notepad"
  },
  fileViewer: {
    es: "Visor de archivos",
    en: "File Viewer"
  },
  searchFiles: {
    es: "Buscar archivos",
    en: "Search Files"
  }
};

export const useTranslation = () => {
  const { language } = useLanguage();
  
  const t = (key) => {
    return translations[key]?.[language] || key;
  };
  
  return { t, language };
};

export default translations;
