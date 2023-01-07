import { V1ConfigMap } from '@kubernetes/client-node';
import { request } from '@umijs/max';

export const listNamespacedConfigMap = (
  namespace: string,
): Promise<V1ConfigMap[]> =>
  request(`namespace/${namespace}/config-maps`, {
    method: 'GET',
  });
