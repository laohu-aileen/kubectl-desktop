import { V1Namespace } from '@kubernetes/client-node';
import { request } from '@umijs/max';

export const listNamespace = (): Promise<V1Namespace[]> =>
  request('namespaces', { method: 'GET' });

export const listNamespaceLabels = async (): Promise<
  { label?: string; value?: string }[]
> => {
  const data = await listNamespace();
  return data.map((item) => ({
    label: item.metadata?.name,
    value: item.metadata?.name,
  }));
};

export const readNamespace = (name: string): Promise<V1Namespace> =>
  request(`namespaces/${name}`, { method: 'GET' });

export const createNamespace = (data: V1Namespace): Promise<V1Namespace> =>
  request(`namespaces`, { method: 'POST', data });

export const replaceNamespace = (
  name: string,
  data: V1Namespace,
): Promise<V1Namespace> =>
  request(`namespaces/${name}`, { method: 'PUT', data });

export const deleteNamespace = (name: string): Promise<V1Namespace> =>
  request(`namespaces/${name}`, { method: 'DELETE' });
