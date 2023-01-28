import { IpcRESTFul } from '@/utils/restful';
import type { CoreV1Event } from '@kubernetes/client-node';

export const namespacedEvent = (namespace: string) =>
  new IpcRESTFul<CoreV1Event>('events', [namespace]);
