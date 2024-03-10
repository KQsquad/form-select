import { defineConfig } from "vite";
import path from "path";
import dts from 'vite-plugin-dts';

class Path {
    static lib = path.resolve(__dirname, 'lib')
    static libEntry = path.resolve(Path.lib, 'main.ts')
}

export default defineConfig({
    plugins: [
        dts({
            rollupTypes: true,
        })
    ],
    resolve: {
        alias: [
            {
                find: "~",
                replacement: Path.lib,
            },
        ],
    },
    server: {
        port: 3000,
        open: '/demo/',
    },
    build: {
        manifest: true,
        minify: true,
        reportCompressedSize: true,
        lib: {
            entry: Path.libEntry,
            name: "select",
            fileName: "select",
        },
    },
});