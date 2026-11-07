import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import  './styles/global.css';
import './components/Header/header.css';
import './components/Hero/hero.css';
import './components/Services/services.css';
import './components/About/about.css';
import './components/Process/process.css';
import './components/Contact/contact.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
