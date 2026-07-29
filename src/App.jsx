import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import CosmicScene from './components/CosmicScene';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import LabsPage from './pages/LabsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

function useHashRoute(defaultRoute = 'home') {
  const getRoute = () => window.location.hash.slice(1) || defaultRoute;
  const [page, setPage] = useState(getRoute);

  useEffect(() => {
    const handleRouteChange = () => setPage(getRoute());
    window.addEventListener('hashchange', handleRouteChange);
    return () => window.removeEventListener('hashchange', handleRouteChange);
  }, []);

  const navigate = (route) => {
    if (route === page) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.location.hash = route;
  };

  return [page, navigate];
}

const navigation = [
  { id: 'home', label: 'Index' },
  { id: 'projects', label: 'Work' },
  { id: 'labs', label: 'Lab' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export default function App() {
  const [currentPage, navigate] = useHashRoute('home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    setMenuOpen(false);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'projects':
        return <ProjectsPage />;
      case 'labs':
        return <LabsPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage navigate={navigate} />;
    }
  };

  return (
    <div className="site-shell">
      <CosmicScene page={currentPage} />
      <div className="scene-vignette" aria-hidden="true" />

      <header className="site-header">
        <button className="brand-lockup" onClick={() => navigate('home')} aria-label="Go to home">
          <span className="brand-mark" aria-hidden="true">PT</span>
          <span>
            <strong>Pham Quoc Trung</strong>
            <small>Digital IC / RTL</small>
          </span>
        </button>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item, index) => (
            <React.Fragment key={item.id}>
              {index > 0 && <span className="nav-dot" aria-hidden="true">·</span>}
              <button
                className={currentPage === item.id ? 'is-active' : ''}
                onClick={() => navigate(item.id)}
                aria-current={currentPage === item.id ? 'page' : undefined}
              >
                {item.label}
              </button>
            </React.Fragment>
          ))}
        </nav>

        <button
          className="mobile-menu-button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        >
          {menuOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </header>

      <nav
        id="mobile-navigation"
        className={`mobile-nav ${menuOpen ? 'is-open' : ''}`}
        aria-label="Mobile navigation"
      >
        {navigation.map((item) => (
          <button
            key={item.id}
            className={currentPage === item.id ? 'is-active' : ''}
            onClick={() => navigate(item.id)}
            aria-current={currentPage === item.id ? 'page' : undefined}
          >
            <span>{item.label}</span>
            <span aria-hidden="true">{currentPage === item.id ? '●' : '○'}</span>
          </button>
        ))}
      </nav>

      <main className={`page-stage page-${currentPage}`} key={currentPage}>
        {renderPage()}
      </main>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Pham Quoc Trung</span>
        <span>RTL · FPGA · RISC-V</span>
      </footer>
    </div>
  );
}
