import { IpcRESTFul } from '@/utils/restful';
import type { V1PersistentVolumeClaim } from '@kubernetes/client-node';

export const namespacedPersistentVolumeClaim = (namespace: string) =>
  new IpcRESTFul<V1PersistentVolumeClaim>('persistent-volume-claims', [
    namespace,
  ]);
