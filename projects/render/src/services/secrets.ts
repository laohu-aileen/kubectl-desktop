import { IpcRESTFul } from '@/utils/restful';
import type { V1Secret } from '@kubernetes/client-node';

export const namespacedSecret = (namespace: string) =>
  new IpcRESTFul<V1Secret>('secrets', [namespace]);
