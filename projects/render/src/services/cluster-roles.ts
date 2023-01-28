import { IpcRESTFul } from '@/utils/restful';
import type { V1ClusterRole } from '@kubernetes/client-node';

const name = 'cluster-roles';
export const clusterRole = new IpcRESTFul<V1ClusterRole>(name);
