import { RESTFul } from '@/utils/restful';
import { V1CronJob } from '@kubernetes/client-node';

export const namespacedCronJob = (namespace: string) =>
  new RESTFul<V1CronJob>(`namespace/${namespace}/cron-jobs`);
