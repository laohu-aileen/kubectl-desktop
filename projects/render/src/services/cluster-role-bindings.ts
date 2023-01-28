import { IpcRESTFul } from '@/utils/restful';
import type { V1ClusterRoleBinding } from '@kubernetes/client-node';

const name = 'cluster-role-bindings';
export const clusterRoleBinding = new IpcRESTFul<V1ClusterRoleBinding>(name);
