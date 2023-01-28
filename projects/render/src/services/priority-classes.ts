import { IpcRESTFul } from '@/utils/restful';
import type { V1PriorityClass } from '@kubernetes/client-node';

const name = 'priority-classes';
export const priorityClass = new IpcRESTFul<V1PriorityClass>(name);
