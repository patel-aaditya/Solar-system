import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }

          if (id.includes('node_modules/three')) {
            return 'three-core';
          }

          if (id.includes('node_modules/@react-three')) {
            return 'three-helpers';
          }
        },
      },
    },
  },
});
