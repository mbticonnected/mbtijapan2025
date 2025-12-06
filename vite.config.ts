import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 載入當前模式的環境變數
  // 第三個參數設為 '' 表示載入所有變數，不限制 VITE_ 開頭
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    define: {
      // 在打包時將 process.env.API_KEY 字串替換為實際的環境變數值
      // 這樣瀏覽器端就不會因為找不到 process 而報錯
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
  };
});