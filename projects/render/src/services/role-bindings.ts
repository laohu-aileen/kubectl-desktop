import { IpcRESTFul } from '@/utils/restful';
import type { V1RoleBinding } from '@kubernetes/client-node';

export const namespacedRoleBinding = (namespace: string) =>
  new IpcRESTFul<V1RoleBinding>('role-bindings', [namespace]);
