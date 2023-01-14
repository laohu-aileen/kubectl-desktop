import { RESTFul } from '@/utils/restful';
import { V1ClusterRoleBinding } from '@kubernetes/client-node';

const url = 'cluster-role-bindings';
export const clusterRoleBinding = new RESTFul<V1ClusterRoleBinding>(url);
