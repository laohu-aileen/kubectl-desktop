import { V1StatefulSet } from '@kubernetes/client-node';
import { request } from '@umijs/max';

export const listNamespacedStatefulSet = (
  namespace: string,
): Promise<V1StatefulSet[]> =>
  request(`namespace/${namespace}/stateful-sets`, {
    method: 'GET',
  });
