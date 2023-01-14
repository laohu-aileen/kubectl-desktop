import { RESTFul } from '@/utils/restful';
import { V1DaemonSet } from '@kubernetes/client-node';

export const namespacedDaemonSet = (namespace: string) =>
  new RESTFul<V1DaemonSet>(`namespace/${namespace}/daemon-sets`);
