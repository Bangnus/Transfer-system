import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allow access from external network
    port: 5173, // Specify the port
  },
  optimizeDeps: {
    include: ['@material-tailwind/react'],
  },
});
