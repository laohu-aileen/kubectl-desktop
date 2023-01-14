import { RESTFul } from '@/utils/restful';
import { V1PriorityClass } from '@kubernetes/client-node';

const url = 'priority-classes';
export const priorityClass = new RESTFul<V1PriorityClass>(url);
