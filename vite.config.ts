// Import defineConfig helper from Vite for type-safe build configuration
import { defineConfig } from 'vite';
// Import Official React plugin for Vite to support JSX compilation & Fast Refresh
import react from '@vitejs/plugin-react';
// Import basic SSL plugin to generate self-signed HTTPS certificates for local development (required for iOS camera API access)
import basicSsl from '@vitejs/plugin-basic-ssl';

// Export Vite configuration object
export default defineConfig({
  plugins: [
    react(), // Enable React JSX transformations
    basicSsl() // Enable local HTTPS server mode for WebRTC/getUserMedia camera security requirements
  ]
});


