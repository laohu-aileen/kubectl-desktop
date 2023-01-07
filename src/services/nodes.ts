import { V1Node } from '@kubernetes/client-node';
import { request } from '@umijs/max';

export const listNode = (): Promise<V1Node[]> =>
  request('nodes', { method: 'GET' });
