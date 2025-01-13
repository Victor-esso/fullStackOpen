import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'tippy.js/dist/tippy.css'; // optional for styling
import 'tippy.js/animations/shift-away.css';
import 'tippy.js/themes/light.css';
import 'tippy.js/themes/light-border.css';
import 'tippy.js/themes/material.css';
import 'tippy.js/themes/translucent.css';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <App />
)
