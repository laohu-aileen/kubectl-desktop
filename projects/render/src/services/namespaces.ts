import { IpcRESTFul } from '@/utils/restful';
import type { V1Namespace } from '@kubernetes/client-node';

/**
 * 命名空间资源
 */
const name = 'namespaces';
export const namespace = new IpcRESTFul<V1Namespace>(name);
