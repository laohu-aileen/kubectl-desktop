import { V1StorageClass } from '@kubernetes/client-node';
import { request } from '@umijs/max';

export const listStorageClass = (): Promise<V1StorageClass[]> =>
  request('storage-classes', { method: 'GET' });
