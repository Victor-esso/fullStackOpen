import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Phonebook App',
        short_name: 'Phonebook',
        description: 'A simple phonebook app',
        theme_color: '#000',
        background_color: '#0C0A09',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        screenshots: [
          {
            "src": "/screenshots/desktop-screenshot.png",
            "sizes": "1200x800",
            "type": "image/png",
            "form_factor": "wide"
          },
          {
            "src": "/screenshots/mobile-screenshot.png",
            "sizes": "720x1280",
            "type": "image/png",
            "form_factor": "narrow"
          }
        ]
      },
    }),

  ],
  server:{
    port: 3069,
  }
})
