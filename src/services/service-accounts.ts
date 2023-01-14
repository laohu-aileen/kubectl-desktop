import { RESTFul } from '@/utils/restful';
import { V1ServiceAccount } from '@kubernetes/client-node';

export const namespacedServiceAccount = (namespace: string) =>
  new RESTFul<V1ServiceAccount>(`namespace/${namespace}/service-accounts`);
