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

export const namespaceRestful = new RESTFul<Namespace>('namespaces', [
  'get',
  'getAll',
  'update',
]);
