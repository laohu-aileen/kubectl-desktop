import { defineConfig } from '@umijs/max';
import routes from './routes';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  npmClient: 'yarn',
  routes,
  layout: {
    title: 'kubernetes',
  },
});
