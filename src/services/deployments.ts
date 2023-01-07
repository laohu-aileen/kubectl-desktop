import { V1Deployment } from '@kubernetes/client-node';
import { request } from '@umijs/max';

export const listNamespacedDeployment = (
  namespace: string,
): Promise<V1Deployment[]> =>
  request(`namespace/${namespace}/deployments`, {
    method: 'GET',
  });
