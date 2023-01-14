import { RESTFul } from '@/utils/restful';
import { V1PersistentVolume } from '@kubernetes/client-node';

const url = 'persistent-volumes';
export const persistentVolume = new RESTFul<V1PersistentVolume>(url);
