import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { releaseFeed } from './build/releaseFeed.ts'
import { ROUTES } from './src/routes.ts'

/**
 * GitHub Pages serves `/privacy` from `privacy.html` with a 200 status, so each
 * route gets its own copy of the app shell. `404.html` catches anything else.
 */
function staticRoutePages(): Plugin {
  const pagePaths = Object.values(ROUTES)
    .filter((route) => route !== ROUTES.home)
    .map((route) => `${route.slice(1)}.html`)

  return {
    name: 'static-route-pages',
    apply: 'build',
    // Vite emits index.html in its own post step, so run after it
    enforce: 'post',
    generateBundle(_options, bundle) {
      const shell = bundle['index.html']
      if (shell?.type !== 'asset') {
        this.error('index.html missing from the build output')
      }
      for (const fileName of [...pagePaths, '404.html']) {
        this.emitFile({ type: 'asset', fileName, source: shell.source })
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    releaseFeed(),
    staticRoutePages(),
  ],
})
