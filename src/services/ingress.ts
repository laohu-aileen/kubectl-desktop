import { V1Ingress } from '@kubernetes/client-node';
import { request } from '@umijs/max';

export const listNamespacedIngress = (
  namespace: string,
): Promise<V1Ingress[]> =>
  request(`namespace/${namespace}/ingress`, {
    method: 'GET',
  });
