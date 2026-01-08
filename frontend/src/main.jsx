import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { BrowserRouter } from 'react-router'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.css'



const googleClientID = import.meta.env.VITE_GOOGLE_CLIENT_ID

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <GoogleOAuthProvider clientId={googleClientID}>
    <App />
    </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
