import { RESTFul } from '@/utils/restful';
import { V1StatefulSet } from '@kubernetes/client-node';

export const namespacedStatefulSet = (namespace: string) =>
  new RESTFul<V1StatefulSet>(`namespace/${namespace}/stateful-sets`);
