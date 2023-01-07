import { CoreV1Event } from '@kubernetes/client-node';
import { request } from '@umijs/max';

export const listNamespacedEvent = (
  namespace: string,
): Promise<CoreV1Event[]> =>
  request(`namespace/${namespace}/events`, {
    method: 'GET',
  });
