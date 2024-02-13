import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    server: {
      host: true, // 0.0.0.0 或 true 开启所有
      port: Number(env.VITE_APP_PORT) || 3000,
      open: true, // 运行后是否打开浏览器
    },
  };
});
