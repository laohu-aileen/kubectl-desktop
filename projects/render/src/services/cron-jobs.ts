import { IpcRESTFul } from '@/utils/restful';
import type { V1CronJob } from '@kubernetes/client-node';

export const namespacedCronJob = (namespace: string) =>
  new IpcRESTFul<V1CronJob>('cron-jobs', [namespace]);
