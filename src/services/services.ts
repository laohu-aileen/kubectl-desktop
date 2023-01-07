import { V1Service } from '@kubernetes/client-node';
import { request } from '@umijs/max';

export const listNamespacedService = (
  namespace: string,
): Promise<V1Service[]> =>
  request(`namespace/${namespace}/services`, {
    method: 'GET',
  });
