import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' = relativní cesty, takže web funguje na GitHub Pages i v libovolné podsložce hostingu.
export default defineConfig({
  base: './',
  plugins: [react()],
});
