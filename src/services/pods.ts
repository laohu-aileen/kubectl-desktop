import { request } from '@umijs/max';
import { RESTFul } from '@/utils/restful';
import { V1Pod } from '@kubernetes/client-node';

export const namespacedPod = (namespace: string) =>
  new RESTFul<V1Pod>(`namespace/${namespace}/pods`);

export const namespacedLogtail = (namespace: string, name: string) => ({
  pull(params?: { container?: string; lines?: number }): Promise<string> {
    const url = `namespace/${namespace}/pods/${name}/logs`;
    return request(url, { method: 'GET', params });
  },
});
