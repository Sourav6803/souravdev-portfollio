// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   optimizeDeps: {
//     include: ['react-router-dom', '@tiptap/react',
//       '@tiptap/pm',
//       '@tiptap/starter-kit',
//       '@tiptap/extension-image',
//       '@tiptap/extension-link', 
//       '@tiptap/extension-underline'],
//        exclude: ['@tiptap/core'] // Sometimes needed
//   }
// });


// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    // ✅ DO NOT include @tiptap/pm here!
    include: [
      'react-router-dom',
      '@tiptap/react',
      '@tiptap/starter-kit',
      '@tiptap/extension-image',
      '@tiptap/extension-link',
      '@tiptap/extension-underline',
    ],
    // ✅ Explicitly exclude the problematic package
    exclude: ['@tiptap/pm'],
  },
});
