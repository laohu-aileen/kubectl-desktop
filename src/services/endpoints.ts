import { RESTFul } from '@/utils/restful';
import { V1Endpoints } from '@kubernetes/client-node';

export const namespacedEndpoints = (namespace: string) =>
  new RESTFul<V1Endpoints>(`namespace/${namespace}/endpoints`);
