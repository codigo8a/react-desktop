import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useWindow } from '../../context/WindowContext';
import { useTranslation } from '../../i18n/translations';

export const SettingsApp = () => {
  const { language, changeLanguage } = useLanguage();
  const { onClose } = useWindow() || {};
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  const handleApply = () => {
    changeLanguage(selectedLanguage);
    onClose?.();
  };

  const handleCancel = () => {
    onClose?.();
  };

  return (
    <div style={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      background: '#c0c0c0',
      fontFamily: '"MS Sans Serif", Arial, sans-serif',
      fontSize: '11px'
    }}>
      <div style={{ 
        padding: '16px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px'
        }}>
          <label style={{ 
            fontWeight: 'bold',
            minWidth: '80px'
          }}>
            {t('language')}:
          </label>
          <div className="field-row" style={{ flex: 1 }}>
            <select 
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              style={{ 
                width: '100%',
                minWidth: '120px'
              }}
            >
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>
        </div>

        <div style={{ 
          marginTop: '8px',
          padding: '8px',
          background: '#fffff0',
          border: '1px solid #000',
          fontSize: '10px',
          color: '#444'
        }}>
          {selectedLanguage === 'es' 
            ? 'El idioma seleccionado afectará toda la interfaz de usuario.'
            : 'The selected language will affect the entire user interface.'}
        </div>
      </div>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'flex-end', 
        gap: '8px', 
        padding: '8px 16px 16px'
      }}>
        <button 
          onClick={handleApply}
          style={{
            padding: '4px 20px',
            background: '#c0c0c0',
            border: '2px outset #ffffff',
            boxShadow: '1px 1px 0px #000',
            cursor: 'pointer',
            fontFamily: '"MS Sans Serif", Arial, sans-serif',
            fontSize: '11px',
            minWidth: '75px'
          }}
        >
          {t('apply')}
        </button>
        <button 
          onClick={handleCancel}
          style={{
            padding: '4px 20px',
            background: '#c0c0c0',
            border: '2px outset #ffffff',
            boxShadow: '1px 1px 0px #000',
            cursor: 'pointer',
            fontFamily: '"MS Sans Serif", Arial, sans-serif',
            fontSize: '11px',
            minWidth: '75px'
          }}
        >
          {t('cancel')}
        </button>
      </div>
    </div>
  );
};
