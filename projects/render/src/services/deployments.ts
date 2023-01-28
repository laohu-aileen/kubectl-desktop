import { IpcRESTFul } from '@/utils/restful';
import type { V1Deployment } from '@kubernetes/client-node';

export const namespacedDeployment = (namespace: string) =>
  new IpcRESTFul<V1Deployment>('deployments', [namespace]);
