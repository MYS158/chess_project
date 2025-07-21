import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    root: 'public',
    build: {
        outDir: '../dist',
        rollupOptions: {
            input: path.resolve(__dirname, 'public/index.html')
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    }
});