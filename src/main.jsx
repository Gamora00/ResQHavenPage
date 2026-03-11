import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import 'leaflet/dist/leaflet.css'

import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
