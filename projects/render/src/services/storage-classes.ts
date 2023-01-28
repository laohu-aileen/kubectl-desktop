import { IpcRESTFul } from '@/utils/restful';
import type { V1StorageClass } from '@kubernetes/client-node';

const name = 'storage-classes';
export const storageClass = new IpcRESTFul<V1StorageClass>(name);
