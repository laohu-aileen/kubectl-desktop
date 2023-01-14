import { RESTFul } from '@/utils/restful';
import { V1Pod } from '@kubernetes/client-node';

export const namespacedPod = (namespace: string) =>
  new RESTFul<V1Pod>(`namespace/${namespace}/pods`);
