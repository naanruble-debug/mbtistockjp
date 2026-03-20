import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'mbti-stock-jp',
  brand: {
    displayName: 'Stock MBTI',
    primaryColor: '#FF6B35',
    icon: '',
  },
  web: {
    host: 'localhost',
    port: 5176,
    commands: {
      dev: 'vite',
      build: 'vite build',
    },
  },
  permissions: [],
});