import { RESTFul } from '@/utils/restful';
import { V1Node } from '@kubernetes/client-node';

const url = 'nodes';
export const node = new RESTFul<V1Node>(url);
