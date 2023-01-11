import { V1ConfigMap } from '@kubernetes/client-node';
import { request } from '@umijs/max';

export const listNamespacedConfigMap = (
  namespace: string,
): Promise<V1ConfigMap[]> =>
  request(`namespace/${namespace}/config-maps`, {
    method: 'GET',
  });

export const readNamespacedConfigMap = (
  name: string,
  namespace: string,
): Promise<V1ConfigMap> =>
  request(`namespace/${namespace}/config-maps/${name}`, {
    method: 'GET',
  });

export const createNamespacedConfigMap = (
  namespace: string,
  data: V1ConfigMap,
): Promise<V1ConfigMap> =>
  request(`namespace/${namespace}/config-maps`, {
    method: 'POST',
    data,
  });

export const replaceNamespacedConfigMap = (
  name: string,
  namespace: string,
  data: V1ConfigMap,
): Promise<V1ConfigMap> =>
  request(`namespace/${namespace}/config-maps/${name}`, {
    method: 'PUT',
    data,
  });

export const deleteNamespacedConfigMap = (
  name: string,
  namespace: string,
): Promise<V1ConfigMap> =>
  request(`namespace/${namespace}/config-maps/${name}`, {
    method: 'DELETE',
  });
