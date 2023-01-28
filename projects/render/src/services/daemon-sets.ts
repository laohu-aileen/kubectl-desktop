import { IpcRESTFul } from '@/utils/restful';
import type { V1DaemonSet } from '@kubernetes/client-node';

export const namespacedDaemonSet = (namespace: string) =>
  new IpcRESTFul<V1DaemonSet>('daemon-sets', [namespace]);
