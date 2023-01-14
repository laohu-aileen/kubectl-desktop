import { RESTFul } from '@/utils/restful';
import { V1Role } from '@kubernetes/client-node';

export const namespacedRole = (namespace: string) =>
  new RESTFul<V1Role>(`namespace/${namespace}/roles`);
