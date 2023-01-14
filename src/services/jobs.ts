import { RESTFul } from '@/utils/restful';
import { V1Job } from '@kubernetes/client-node';

export const namespacedJob = (namespace: string) =>
  new RESTFul<V1Job>(`namespace/${namespace}/jobs`);
