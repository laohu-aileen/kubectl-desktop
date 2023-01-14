import { RESTFul } from '@/utils/restful';
import { V1Ingress } from '@kubernetes/client-node';

export const namespacedIngress = (namespace: string) =>
  new RESTFul<V1Ingress>(`namespace/${namespace}/ingress`);
