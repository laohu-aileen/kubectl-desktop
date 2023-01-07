import { V1PersistentVolume } from '@kubernetes/client-node';
import { request } from '@umijs/max';

export const listPersistentVolume = (): Promise<V1PersistentVolume[]> =>
  request('persistent-volumes', { method: 'GET' });
