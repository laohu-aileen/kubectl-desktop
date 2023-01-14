import { RESTFul } from '@/utils/restful';
import { V1Service } from '@kubernetes/client-node';

export const namespacedService = (namespace: string) =>
  new RESTFul<V1Service>(`namespace/${namespace}/services`);
