import { V1RoleBinding } from '@kubernetes/client-node';
import { request } from '@umijs/max';

export const listNamespacedRoleBinding = (
  namespace: string,
): Promise<V1RoleBinding[]> =>
  request(`namespace/${namespace}/role-bindings`, {
    method: 'GET',
  });
