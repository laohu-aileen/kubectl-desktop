import { request } from '@umijs/max';

export const listNamespacedJob = (namespace: string): Promise<any[]> =>
  request(`namespace/${namespace}/jobs`, {
    method: 'GET',
  });
