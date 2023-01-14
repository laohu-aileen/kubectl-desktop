import { RESTFul } from '@/utils/restful';
import { V1PersistentVolumeClaim } from '@kubernetes/client-node';

export const namespacedPersistentVolumeClaim = (namespace: string) =>
  new RESTFul<V1PersistentVolumeClaim>(
    `namespace/${namespace}/persistent-volume-claims`,
  );
