import { IpcRESTFul } from '@/utils/restful';
import type { V1PersistentVolume } from '@kubernetes/client-node';

const name = 'persistent-volumes';
export const persistentVolume = new IpcRESTFul<V1PersistentVolume>(name);
