import { useState } from 'react';
import { useWindow } from '../../context/WindowContext';
import { useTranslation } from '../../i18n/translations';
import './index.css';

export const WelcomeApp = () => {
  const [showAtStartup, setShowAtStartup] = useState(true);
  const [currentTip, setCurrentTip] = useState(0);
  const { onClose } = useWindow() || {};
  const { t } = useTranslation();

  const tips = {
    en: [
      "Full Stack Developer expert in Cloud Process Automation, PaintBall Player, Softcombat Enthusiast, Robotics, Electronics and Technology Lover.",
      "The buttons on the right give a variety of actions you can perform.",
      "Click on the Next Tip button to see a new tip in the Welcome window.",
      "You can de-select the option 'Show this Welcome Screen next time you start Windows' if you prefer not to see this window again."
    ],
    es: [
      "Desarrollador Full Stack experto en Automatización de Procesos en la Nube, Jugador de PaintBall, Entusiasta de Softcombat, Robótica, Electrónica y Tecnología.",
      "Los botones de la derecha ofrecen diversas acciones que puede realizar.",
      "Haga clic en el botón Siguiente Tip para ver un nuevo consejo.",
      "Puede deseleccionar la opción 'Mostrar esta pantalla de bienvenida al iniciar Windows' si prefiere no ver esta ventana."
    ]
  };

  const currentTips = t('language') === 'es' ? tips.es : tips.en;

  const handleNextTip = () => {
    setCurrentTip((prev) => (prev + 1) % currentTips.length);
  };

  const handleClose = () => {
    onClose?.();
  };

  return (
    <div style={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      background: '#c0c0c0',
      color: '#000',
      fontFamily: '"MS Sans Serif", Arial, sans-serif',
      fontSize: '11px',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <h2 style={{ 
        fontSize: '18px', 
        margin: '0 0 15px 0', 
        fontWeight: 'normal',
        color: '#000'
      }}>
        {t('welcome')}
      </h2>

      <div style={{ 
        display: 'flex', 
        flex: 1,
        gap: '20px'
      }}>
        <div style={{ 
          flex: 1,
          background: '#fff',
          border: '2px inset #ffffff',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
           <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
             <div style={{ fontSize: '32px' }}>💡</div>
             <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 12px 0', fontWeight: 'bold', fontSize: '13px' }}>{t('welcomeTip')}</p>
                <p style={{ margin: 0, lineHeight: '1.5', fontSize: '12px' }}>
                  {currentTips[currentTip]}
                </p>
             </div>
           </div>
        </div>

        <div style={{ 
          width: '140px', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '10px' 
        }}>
          <button 
            onClick={handleNextTip}
            style={{
              padding: '6px 12px',
              background: '#c0c0c0',
              border: '2px outset #ffffff',
              boxShadow: '1px 1px 0px #000',
              cursor: 'pointer',
              textAlign: 'left',
              width: '100%'
            }}
          >
            {t('nextTip')}
          </button>
          <button 
            style={{
              padding: '6px 12px',
              background: '#c0c0c0',
              border: '2px outset #ffffff',
              boxShadow: '1px 1px 0px #000',
              cursor: 'pointer',
              textAlign: 'left',
              width: '100%'
            }}
          >
            {t('whatsNew')}
          </button>
          <button 
            style={{
              padding: '6px 12px',
              background: '#c0c0c0',
              border: '2px outset #ffffff',
              boxShadow: '1px 1px 0px #000',
              cursor: 'pointer',
              textAlign: 'left',
              width: '100%'
            }}
          >
            {t('onlineRegistration')}
          </button>
          <button 
            onClick={handleClose}
            style={{
              padding: '6px 12px',
              background: '#c0c0c0',
              border: '2px outset #ffffff',
              boxShadow: '1px 1px 0px #000',
              cursor: 'pointer',
              textAlign: 'left',
              width: '100%',
              marginTop: '10px'
            }}
          >
            {t('close')}
          </button>
        </div>
      </div>

      <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input 
          type="checkbox" 
          checked={showAtStartup}
          onChange={() => setShowAtStartup(!showAtStartup)}
          id="startup-check"
          style={{ cursor: 'pointer' }}
        />
        <label htmlFor="startup-check" style={{ cursor: 'pointer' }}>
          {t('showWelcomeScreen')}
        </label>
      </div>
    </div>
  );
};
