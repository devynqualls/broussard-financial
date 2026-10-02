import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/globals.css'
import App from './App.tsx'

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

const root=document.getElementById('root')!;
if(root.hasChildNodes()) hydrateRoot(root,app); else createRoot(root).render(app);
