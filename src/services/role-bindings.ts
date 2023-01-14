import { RESTFul } from '@/utils/restful';
import { V1RoleBinding } from '@kubernetes/client-node';

export const namespacedRoleBinding = (namespace: string) =>
  new RESTFul<V1RoleBinding>(`namespace/${namespace}/role-bindings`);
