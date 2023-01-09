import { V1PriorityClass } from '@kubernetes/client-node';
import { request } from '@umijs/max';

export const listPriorityClass = (): Promise<V1PriorityClass[]> =>
  request('priority-classes', { method: 'GET' });
