import { IpcRESTFul } from '@/utils/restful';
import type { V1Job } from '@kubernetes/client-node';

export const namespacedJob = (namespace: string) =>
  new IpcRESTFul<V1Job>('jobs', [namespace]);
