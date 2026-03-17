import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { useTranslation } from '../../i18n/translations';
import './index.css';

const MarkdownComponents = {
  h1: ({ children }) => <h1>{children}</h1>,
  h2: ({ children }) => <h2>{children}</h2>,
  h3: ({ children }) => <h3>{children}</h3>,
  p: ({ children }) => <p>{children}</p>,
  ul: ({ children }) => <ul>{children}</ul>,
  ol: ({ children }) => <ol>{children}</ol>,
  li: ({ children }) => <li>{children}</li>,
  code: ({ children }) => <code>{children}</code>,
  pre: ({ children }) => <pre>{children}</pre>,
  blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  strong: ({ children }) => <strong>{children}</strong>,
  em: ({ children }) => <em>{children}</em>,
  a: ({ children, href }) => <a href={href}>{children}</a>,
  img: ({ src, alt }) => <img src={src} alt={alt || ''} />,
  hr: () => <hr />
};

export const FileViewerApp = ({ file }) => {
  const [activeTab, setActiveTab] = useState('preview');
  const { t } = useTranslation();

  if (!file) {
    return (
      <div className="fileviewer-empty">
        No hay archivo seleccionado
      </div>
    );
  }

  return (
    <div className="fileviewer-container">
      <menu role="tablist" className="fileviewer-tabs">
        <li 
          role="tab" 
          aria-selected={activeTab === 'preview'}
          className={`fileviewer-tab ${activeTab === 'preview' ? 'fileviewer-tab-active' : 'fileviewer-tab-inactive'}`}
        >
          <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('preview'); }}>
            {t('preview')}
          </a>
        </li>
        <li 
          role="tab" 
          aria-selected={activeTab === 'source'}
          className={`fileviewer-tab ${activeTab === 'source' ? 'fileviewer-tab-active' : 'fileviewer-tab-inactive'}`}
        >
          <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('source'); }}>
            {t('source')}
          </a>
        </li>
      </menu>
      
      <div className="fileviewer-content">
        {activeTab === 'preview' ? (
          <div className="fileviewer-markdown">
            <ReactMarkdown components={MarkdownComponents} rehypePlugins={[rehypeRaw]}>
              {file.content}
            </ReactMarkdown>
          </div>
        ) : (
          <pre className="fileviewer-source">
            {file.content}
          </pre>
        )}
      </div>
    </div>
  );
};
