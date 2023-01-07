import { V1CronJob } from '@kubernetes/client-node';
import { request } from '@umijs/max';

export const listNamespacedCronJob = (
  namespace: string,
): Promise<V1CronJob[]> =>
  request(`namespace/${namespace}/cron-jobs`, {
    method: 'GET',
  });
