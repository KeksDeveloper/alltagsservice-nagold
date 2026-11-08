import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router';
import './styles/fonts.css';
import './styles/legal.css';
import  './styles/global.css';
import './components/Header/header.css';
import './components/Hero/hero.css';
import './components/Services/services.css';
import './components/About/about.css';
import './components/Process/process.css';
import './components/Contact/contact.css';
import './components/Footer/footer.css';
import './components/Gallery/gallery.css';
import './styles/Responsive.css';
import App from './App.tsx';

// Der Router steuert die Scrollposition statt der Browser-Wiederherstellung.
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter><App /></HashRouter>
  </StrictMode>,
)
