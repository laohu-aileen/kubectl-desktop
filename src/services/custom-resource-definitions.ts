import { V1CustomResourceDefinition } from '@kubernetes/client-node';
import { request } from '@umijs/max';

export const listCustomResourceDefinition = (): Promise<
  V1CustomResourceDefinition[]
> =>
  request('custom-resource-definitions', {
    method: 'GET',
  });
