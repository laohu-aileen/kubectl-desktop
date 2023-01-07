import { V1ServiceAccount } from '@kubernetes/client-node';
import { request } from '@umijs/max';

export const listNamespacedServiceAccount = (
  namespace: string,
): Promise<V1ServiceAccount[]> =>
  request(`namespace/${namespace}/service-accounts`, {
    method: 'GET',
  });
