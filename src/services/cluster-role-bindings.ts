import { V1ClusterRoleBinding } from '@kubernetes/client-node';
import { request } from '@umijs/max';

export const listClusterRoleBinding = (): Promise<V1ClusterRoleBinding[]> =>
  request('cluster-role-bindings', { method: 'GET' });
