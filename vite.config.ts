import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 1. 載入 .env 檔案中的變數
  const env = loadEnv(mode, (process as any).cwd(), '');

  // 2. 確定最終使用的 API KEY
  const apiKey = process.env.API_KEY || env.API_KEY || '';

  console.log(`[Vite Build] API Key injected: ${apiKey ? 'Yes (Hidden)' : 'No (Empty)'}`);

  return {
    plugins: [react()],
    define: {
      // Configure process.env.API_KEY to be replaced by the string value during build
      'process.env.API_KEY': JSON.stringify(apiKey),
    },
  };
});