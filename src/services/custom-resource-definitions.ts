import { RESTFul } from '@/utils/restful';
import { V1CustomResourceDefinition } from '@kubernetes/client-node';

const url = 'custom-resource-definitions';
export const customResourceDefinition = new RESTFul<V1CustomResourceDefinition>(
  url,
);
