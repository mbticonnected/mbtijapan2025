import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 1. 載入 .env 檔案中的變數 (本地開發用)
  const env = loadEnv(mode, '.', '');

  // 2. 確定最終使用的 API KEY
  // process.env.API_KEY 來自 Vercel 建置環境
  // env.API_KEY 來自本地 .env 檔案
  const apiKey = process.env.API_KEY || env.API_KEY || '';

  console.log(`[Vite Build] API Key injected: ${apiKey ? 'Yes (Hidden)' : 'No (Empty)'}`);

  return {
    plugins: [react()],
    define: {
      // 1. 強制替換 process.env.API_KEY 為字串值
      'process.env.API_KEY': JSON.stringify(apiKey),
      
      // 2. 定義 process.env 避免其他套件存取時報錯 (process is not defined)
      'process.env': {},
      
      // 3. 定義 global 避免某些舊套件報錯
      'global': 'window',
    },
  };
});