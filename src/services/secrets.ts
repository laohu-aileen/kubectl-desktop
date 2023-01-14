import { RESTFul } from '@/utils/restful';
import { V1Secret } from '@kubernetes/client-node';

export const namespacedSecret = (namespace: string) =>
  new RESTFul<V1Secret>(`namespace/${namespace}/secrets`);
