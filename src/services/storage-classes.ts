import { RESTFul } from '@/utils/restful';
import { V1StorageClass } from '@kubernetes/client-node';

const url = 'storage-classes';
export const storageClass = new RESTFul<V1StorageClass>(url);
