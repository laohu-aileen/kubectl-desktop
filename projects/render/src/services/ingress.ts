import { IpcRESTFul } from '@/utils/restful';
import type { V1Ingress } from '@kubernetes/client-node';

export const namespacedIngress = (namespace: string) =>
  new IpcRESTFul<V1Ingress>('ingress', [namespace]);
