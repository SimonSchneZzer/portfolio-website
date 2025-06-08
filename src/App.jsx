import './styles/index.css';
import './styles/variables.css';
import './styles/base.css';
import './styles/responsive.css';
import './styles/nav.css';
import './styles/reset.css';
import './styles/sections.css';

import InteractiveBackground from './components/InteractiveBackground/InteractiveBackground';
import Navigation from './components/Navigation/Navigation';
import { ScrollProvider } from './context/ScrollContext';
import { AppProvider } from './context/AppContext';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import SuspenseWrapper from './components/SuspenseWrapper/SuspenseWrapper';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';
import {
  HeroSection,
  AboutSection,
  CVSection,
  ProjectsSection,
  ContactSection
} from './config/lazyComponents';

const sections = [
  { Component: HeroSection, id: 'hero' },
  { Component: AboutSection, id: 'about' },
  { Component: CVSection, id: 'cv' },
  { Component: ProjectsSection, id: 'projects' },
  { Component: ContactSection, id: 'contact' }
];

const AppContent = () => {
  useIntersectionObserver();
  
  return (
    <ScrollProvider>
      <InteractiveBackground />
      <Navigation />
      <main className="portfolio-content">
        <SuspenseWrapper>
          {sections.map(({ Component, id }) => (
            <Component key={id} />
          ))}
        </SuspenseWrapper>
      </main>
    </ScrollProvider>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;