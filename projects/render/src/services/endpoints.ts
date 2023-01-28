import { IpcRESTFul } from '@/utils/restful';
import type { V1Endpoints } from '@kubernetes/client-node';

export const namespacedEndpoints = (namespace: string) =>
  new IpcRESTFul<V1Endpoints>('endpoints', [namespace]);
