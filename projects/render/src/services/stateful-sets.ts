import { IpcRESTFul } from '@/utils/restful';
import type { V1StatefulSet } from '@kubernetes/client-node';

export const namespacedStatefulSet = (namespace: string) =>
  new IpcRESTFul<V1StatefulSet>('stateful-sets', [namespace]);
