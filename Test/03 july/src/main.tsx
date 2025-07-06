import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AppWithTheme from './AppWithTheme'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWithTheme>
      <App />
    </AppWithTheme>
  </StrictMode>,
)
