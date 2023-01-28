import { IpcRESTFul } from '@/utils/restful';
import type { V1Role } from '@kubernetes/client-node';

export const namespacedRole = (namespace: string) =>
  new IpcRESTFul<V1Role>('roles', [namespace]);
