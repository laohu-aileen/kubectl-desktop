import { V1Role } from '@kubernetes/client-node';
import { request } from '@umijs/max';

export const listNamespacedRole = (namespace: string): Promise<V1Role[]> =>
  request(`namespace/${namespace}/roles`, {
    method: 'GET',
  });
