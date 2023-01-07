import { V1DaemonSet } from '@kubernetes/client-node';
import { request } from '@umijs/max';

export const listNamespacedDaemonSet = (
  namespace: string,
): Promise<V1DaemonSet[]> =>
  request(`namespace/${namespace}/daemon-sets`, {
    method: 'GET',
  });
