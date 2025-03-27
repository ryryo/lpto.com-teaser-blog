export default {
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        color: 'color.html',
      }
    }
  },
  publicDir: 'public',
  css: {
    devSourcemap: true
  },
  optimizeDeps: {
    include: ['sass']
  }
} 