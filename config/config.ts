import { defineConfig } from '@umijs/max';
import routes from './routes';
import define from './define';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  npmClient: 'yarn',
  routes,
  define,
  layout: {
    title: 'kubernetes',
  },
});
