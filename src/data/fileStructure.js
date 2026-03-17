export const FILE_STRUCTURE = [
  {
    name: 'YouTube',
    type: 'folder',
    children: [
      { name: 'tutoriales.md', type: 'file' },
      { name: 'musica.md', type: 'file' },
      { name: 'videos.md', type: 'file' }
    ]
  },
  {
    name: 'Sistemas',
    type: 'folder',
    children: [
      { name: 'arquitectura.md', type: 'file' },
      { name: 'operativos.md', type: 'file' },
      { name: 'redes.md', type: 'file' }
    ]
  },
  {
    name: 'Paginas',
    type: 'folder',
    children: [
      { name: 'documentacion.md', type: 'file' },
      { name: 'enlaces.md', type: 'file' },
      { name: 'recursos.md', type: 'file' }
    ]
  }
];

export const FILE_CONTENT = {
  'tutoriales.md': `# Tutoriales de YouTube\n\nAquí encontraras los mejores tutoriales.\n\n- Aprende React\n- Aprende Node.js\n- Aprende TypeScript`,
  'musica.md': `# Musica\n\nMis videos de musica favoritos.\n\n- Clasica\n- Jazz\n- Rock`,
  'videos.md': `# Videos\n\nColeccion de videos interesantes.`,
  'arquitectura.md': `# Arquitectura de Sistemas\n\n## Principios\n\n- Separacion de responsabilidades\n- Acoplamiento debil\n- Alta cohesion`,
  'operativos.md': `# Sistemas Operativos\n\n## Contenido\n\n- Windows 98\n- Linux\n- MacOS`,
  'redes.md': `# Redes\n\n## Temas\n\n- TCP/IP\n- DNS\n- HTTP`,
  'documentacion.md': `# Documentacion\n\nToda la documentacion del proyecto.`,
  'enlaces.md': `# Enlaces\n\n- Google\n- GitHub\n- StackOverflow`,
  'recursos.md': `# Recursos\n\nLibrerias y herramientas utiles.`
};
