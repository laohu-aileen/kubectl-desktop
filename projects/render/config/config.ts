import { defineConfig } from '@umijs/max';
import { env } from 'process';
import define from './define';
import initialState from './initial';
import locale from './locale';
import routes from './routes';

export default defineConfig({
  npmClient: 'yarn',
  publicPath: env.NODE_ENV === 'production' ? './' : '/',
  history: { type: 'hash' },
  outputPath: '../../target/render',
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
