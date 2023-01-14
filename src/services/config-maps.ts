import { RESTFul } from '@/utils/restful';
import { V1ConfigMap } from '@kubernetes/client-node';

export const namespacedConfigMap = (namespace: string) =>
  new RESTFul<V1ConfigMap>(`namespace/${namespace}/config-maps`);
