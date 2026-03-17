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
      padding: '16px',
      fontFamily: '"MS Sans Serif", Arial, sans-serif',
      fontSize: '11px'
    }}>
      <div style={{ marginBottom: '16px' }}>
        <p style={{ marginBottom: '12px' }}>{t('selectLanguage')}</p>
        
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', cursor: 'pointer' }}>
          <input 
            type="radio" 
            name="language" 
            value="es"
            checked={selectedLanguage === 'es'}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          />
          {t('spanish')}
        </label>
        
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <input 
            type="radio" 
            name="language" 
            value="en"
            checked={selectedLanguage === 'en'}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          />
          {t('english')}
        </label>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: 'auto' }}>
        <button 
          onClick={handleApply}
          style={{
            padding: '4px 16px',
            background: '#c0c0c0',
            border: '2px outset #ffffff',
            boxShadow: '1px 1px 0px #000',
            cursor: 'pointer',
            fontFamily: '"MS Sans Serif", Arial, sans-serif',
            fontSize: '11px'
          }}
        >
          {t('apply')}
        </button>
        <button 
          onClick={handleCancel}
          style={{
            padding: '4px 16px',
            background: '#c0c0c0',
            border: '2px outset #ffffff',
            boxShadow: '1px 1px 0px #000',
            cursor: 'pointer',
            fontFamily: '"MS Sans Serif", Arial, sans-serif',
            fontSize: '11px'
          }}
        >
          {t('cancel')}
        </button>
      </div>
    </div>
  );
};
