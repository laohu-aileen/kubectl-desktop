import { defineConfig } from '@umijs/max';
import define from './define';
import initialState from './initial';
import locale from './locale';
import routes from './routes';

export default defineConfig({
  npmClient: 'yarn',
  initialState,
  locale,
  antd: {},
  access: {},
  model: {},
  request: {},
  routes,
  define,
  layout: {},
});
