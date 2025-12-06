import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 載入環境變數
  // 第三個參數 '' 表示載入所有變數，不限於 VITE_ 開頭
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    define: {
      // 1. 注入 API_KEY (優先使用 API_KEY，如果沒有則找 VITE_API_KEY)
      'process.env.API_KEY': JSON.stringify(env.API_KEY || env.VITE_API_KEY || ''),
      
      // 2. 定義一個空的 process.env 物件，防止瀏覽器報 "process is not defined" 錯誤
      'process.env': {},
    },
  };
});