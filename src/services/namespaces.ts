import { RESTFul } from '@/utils/restful';
import { V1Namespace } from '@kubernetes/client-node';

/**
 * 命名空间资源
 */
const url = 'namespaces';
export const namespace = new RESTFul<V1Namespace>(url);
