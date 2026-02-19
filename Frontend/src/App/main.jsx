import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../style/index.css'
import "react-datepicker/dist/react-datepicker.css";
import App from './App'
import {ThemeProvider} from "../context/themcontext"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
    <App />
    </ThemeProvider>
  </StrictMode>,
)
