/// Ambient modules needed for the Vite app without requiring the `vite/client` types entry.
/// (Keeps `tsc -p tsconfig.app.json` working even when `node_modules/vite` is incomplete.)
declare module '*.css' {}
