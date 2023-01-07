import { V1Pod } from '@kubernetes/client-node';
import { request } from '@umijs/max';

export const listNamespacedPod = (namespace: string): Promise<V1Pod[]> =>
  request(`namespace/${namespace}/pods`, {
    method: 'GET',
  });
