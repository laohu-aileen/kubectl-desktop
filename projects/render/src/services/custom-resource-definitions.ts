import { IpcRESTFul } from '@/utils/restful';
import type { V1CustomResourceDefinition } from '@kubernetes/client-node';

const name = 'custom-resource-definitions';
export const customResourceDefinition =
  new IpcRESTFul<V1CustomResourceDefinition>(name);
