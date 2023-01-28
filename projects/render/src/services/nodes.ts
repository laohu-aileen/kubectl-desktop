import { IpcRESTFul } from '@/utils/restful';
import type { V1Node } from '@kubernetes/client-node';

const name = 'nodes';
export const node = new IpcRESTFul<V1Node>(name);
