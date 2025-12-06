import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 1. 載入 .env 檔案中的變數
  const env = loadEnv(mode, (process as any).cwd(), '');

  // 2. 確定最終使用的 API KEY
  // 優先順序: Vercel 系統變數 > .env 變數 > VITE_ 開頭的變數
  const apiKey = process.env.API_KEY || env.API_KEY || process.env.VITE_API_KEY || env.VITE_API_KEY || '';

  console.log(`[Vite Build] API Key injected: ${apiKey ? 'Yes (Hidden)' : 'No (Empty)'}`);

  return {
    plugins: [react()],
    define: {
      // 將 Key 硬編碼到前端 bundle 中
      'process.env.API_KEY': JSON.stringify(apiKey),
      
      // 定義全域 process 物件，避免部分套件報錯，但不要覆蓋上面的 API_KEY
      'process.env': JSON.stringify({}), 
      'process.browser': JSON.stringify(true),
    },
  };
});