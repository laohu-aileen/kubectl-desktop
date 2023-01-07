import { V1PersistentVolumeClaim } from '@kubernetes/client-node';
import { request } from '@umijs/max';

export const listNamespacedPersistentVolumeClaim = (
  namespace: string,
): Promise<V1PersistentVolumeClaim[]> =>
  request(`namespace/${namespace}/persistent-volume-claims`, {
    method: 'GET',
  });
