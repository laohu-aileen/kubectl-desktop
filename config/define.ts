import { env } from 'process';

/**
 * 运行时常量
 */
export default {
  BASE_URL: env.BASE_URL || '/api/v1/',
  SESSION_TOKEN_KEY: env.SESSION_TOKEN_KEY || 'authorization',
};
