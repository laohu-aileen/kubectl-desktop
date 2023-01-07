import { V1ClusterRole } from '@kubernetes/client-node';
import { request } from '@umijs/max';

export const listClusterRole = (): Promise<V1ClusterRole[]> =>
  request('cluster-roles', { method: 'GET' });
