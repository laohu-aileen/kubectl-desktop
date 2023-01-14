import { RESTFul } from '@/utils/restful';
import { CoreV1Event } from '@kubernetes/client-node';

export const namespacedEvent = (namespace: string) =>
  new RESTFul<CoreV1Event>(`namespace/${namespace}/events`);
