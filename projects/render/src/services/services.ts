import { IpcRESTFul } from '@/utils/restful';
import type { V1Service } from '@kubernetes/client-node';

export const namespacedService = (namespace: string) =>
  new IpcRESTFul<V1Service>('services', [namespace]);
