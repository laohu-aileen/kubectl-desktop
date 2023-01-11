import { V1Secret } from '@kubernetes/client-node';
import { request } from '@umijs/max';

export const listNamespacedSecret = (namespace: string): Promise<V1Secret[]> =>
  request(`namespace/${namespace}/secrets`, {
    method: 'GET',
  });

export const readNamespacedSecret = (
  name: string,
  namespace: string,
): Promise<V1Secret> =>
  request(`namespace/${namespace}/secrets/${name}`, {
    method: 'GET',
  });

export const createNamespacedSecret = (
  namespace: string,
  data: V1Secret,
): Promise<V1Secret> =>
  request(`namespace/${namespace}/secrets`, {
    method: 'POST',
    data,
  });

export const replaceNamespacedSecret = (
  name: string,
  namespace: string,
  data: V1Secret,
): Promise<V1Secret> =>
  request(`namespace/${namespace}/secrets/${name}`, {
    method: 'PUT',
    data,
  });

export const deleteNamespacedSecret = (
  name: string,
  namespace: string,
): Promise<V1Secret> =>
  request(`namespace/${namespace}/secrets/${name}`, {
    method: 'DELETE',
  });
