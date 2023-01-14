import { RESTFul } from '@/utils/restful';
import { V1Namespace } from '@kubernetes/client-node';

/**
 * 命名空间资源
 */
const url = 'namespaces';
export const namespace = new RESTFul<V1Namespace>(url);

/**
 * 生成标签
 *
 * @returns
 */
export const namespaceLabels = async (): Promise<
  { label?: string; value?: string }[]
> => {
  const data = await namespace.list();
  return data.map((item) => ({
    label: item.metadata?.name,
    value: item.metadata?.name,
  }));
};
