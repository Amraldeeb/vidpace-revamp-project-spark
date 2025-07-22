import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
<<<<<<< HEAD
 Base: '/',// <== GitHub Pages base path
=======
  base: '/',  // <== GitHub Pages base path
>>>>>>> ba432804d64ad5be740bbf7fef6b2b1c3988f45f

  plugins: [
    react(),
    mode === 'development' && componentTagger()
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
