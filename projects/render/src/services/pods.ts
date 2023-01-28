import { IpcRESTFul } from '@/utils/restful';
import type { V1Pod } from '@kubernetes/client-node';

export const namespacedPod = (namespace: string) =>
  new IpcRESTFul<V1Pod>('pods', [namespace]);

export const namespacedLogtail = (namespace: string, name: string) => ({
  async pull(params?: { container?: string; lines?: number }): Promise<string> {
    const url = `namespace/${namespace}/pods/${name}/logs`;
    console.log(url, params);
    return '';
  },
});
