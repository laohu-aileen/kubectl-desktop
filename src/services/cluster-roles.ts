import { RESTFul } from '@/utils/restful';
import { V1ClusterRole } from '@kubernetes/client-node';

const url = 'cluster-roles';
export const clusterRole = new RESTFul<V1ClusterRole>(url);
