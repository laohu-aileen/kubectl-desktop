import { IpcRESTFul } from '@/utils/restful';
import type { V1ConfigMap } from '@kubernetes/client-node';

export const namespacedConfigMap = (namespace: string) =>
  new IpcRESTFul<V1ConfigMap>('config-maps', [namespace]);
