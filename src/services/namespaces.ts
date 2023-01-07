import { V1Namespace } from '@kubernetes/client-node';
import { request } from '@umijs/max';
import { RESTFul } from './restful';

export interface Namespace {
  /**
   * 资源ID
   */
  uid: string;

  /**
   * 名称
   */
  name: string;

  /**
   * 创建时间(时间戳)
   */
  creationTimestamp: number;

  /**
   * 标签
   */
  labels: { [key: string]: string };

  /**
   * 状态
   */
  status: string;
}

export const namespaceRestful = new RESTFul<Namespace>('namespaces');

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
