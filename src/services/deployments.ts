import { RESTFul } from '@/utils/restful';
import { V1Deployment } from '@kubernetes/client-node';

export const namespacedDeployment = (namespace: string) =>
  new RESTFul<V1Deployment>(`namespace/${namespace}/deployments`);
