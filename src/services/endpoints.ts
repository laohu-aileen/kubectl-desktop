import { V1Endpoints } from '@kubernetes/client-node';
import { request } from '@umijs/max';

export const listNamespacedEndpoints = (
  namespace: string,
): Promise<V1Endpoints[]> =>
  request(`namespace/${namespace}/endpoints`, {
    method: 'GET',
  });
