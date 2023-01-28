import { IpcRESTFul } from '@/utils/restful';
import type { V1ServiceAccount } from '@kubernetes/client-node';

export const namespacedServiceAccount = (namespace: string) =>
  new IpcRESTFul<V1ServiceAccount>('service-accounts', [namespace]);
