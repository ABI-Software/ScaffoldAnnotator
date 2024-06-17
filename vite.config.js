import { resolve } from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const config = {
    server: {
      port: 8081,
    },
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      }
    },
    build: {
      lib: {
        entry: resolve(__dirname, './src/components/index.js'),
        name: 'ScaffoldAnnotator',
        fileName: 'ScaffoldAnnotator',
      },
      rollupOptions: {
        external: ["vue", "pinia"],
        output: {
          globals: {
            vue: "Vue",
            pinia: "pinia"
          },
        },
      },
    },
  };

  if (command === 'serve') {
    config.server =  {
      port: 8081,
    };
    config.define = {
      'process.env.HTTP_PROXY': 8081,
      global: 'globalThis',
      // If you want to exposes all env variables, which is not recommended
      // 'process.env': env
    };
    config.plugins.push(
      nodePolyfills({
        // To add only specific polyfills, add them here. If no option is passed, adds all polyfills
        include: ['path']
      })
    );
  };
  return config;

})
