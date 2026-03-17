import { Desktop } from './components/Desktop';
import { DesktopProvider } from './context/DesktopContext';
import { LanguageProvider } from './context/LanguageContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { APPS } from './apps/apps';

const initialWindows = [
  {
    appId: 'welcome',
    id: 'welcome-' + Date.now(),
    title: 'Welcome',
    isMinimized: false,
    isActive: true,
    isMaximized: false,
    currentPosition: null,
    initialPosition: { x: 0, y: 0 },
    initialSize: APPS.welcome.defaultSize,
    centered: APPS.welcome.centered,
    zIndex: 10,
    content: <APPS.welcome.component />
  }
];

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <DesktopProvider initialWindows={initialWindows}>
          <Desktop />
        </DesktopProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
