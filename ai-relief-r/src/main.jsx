import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import { AuthProvider } from './context/AuthProvider.jsx'
import { AiReliefProvider } from './context/AiReliefProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <AiReliefProvider>
        <App />
      </AiReliefProvider>
    </AuthProvider>
  </StrictMode>,
)
