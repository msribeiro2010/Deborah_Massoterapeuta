declare global {
  interface ImportMeta {
    /**
     * Absolute filesystem path of the directory containing the current module. This property
     * mirrors `__dirname` from CommonJS for convenience when using ES Modules.
     *
     * Note: Available at runtime in Node.js 20+ behind the `--experimental-import-meta-resolve`
     * flag or via custom loaders. It is injected automatically by Vite when running the config
     * file, so it is safe to rely on it in the build configuration even if your execution
     * environment is older.
     */
    dirname: string;
  }
}

export {};