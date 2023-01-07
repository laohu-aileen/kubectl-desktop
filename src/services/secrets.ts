import { V1Secret } from '@kubernetes/client-node';
import { request } from '@umijs/max';

export const listNamespacedSecret = (namespace: string): Promise<V1Secret[]> =>
  request(`namespace/${namespace}/secrets`, {
    method: 'GET',
  });
