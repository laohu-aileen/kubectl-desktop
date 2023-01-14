import { V1CronJob } from '@kubernetes/client-node';
import { Request, Response } from 'express';
import { batch } from '../config/kubernetes';

export default {
  'GET /api/v1/namespace/:namespace/cron-jobs': async (
    req: Request<{ namespace: string }>,
    res: Response<V1CronJob[]>,
  ) => {
    const { namespace } = req.params;
    const data = await batch.listNamespacedCronJob(namespace);
    res.json(data.body.items);
  },
  'POST /api/v1/namespace/:namespace/cron-jobs': async (
    req: Request<{ namespace: string }>,
    res: Response<V1CronJob>,
  ) => {
    const { namespace } = req.params;
    const data = await batch.createNamespacedCronJob(namespace, req.body);
    res.json(data.body);
  },
  'GET /api/v1/namespace/:namespace/cron-jobs/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<V1CronJob>,
  ) => {
    const { name, namespace } = req.params;
    const data = await batch.readNamespacedCronJob(name, namespace);
    res.json(data.body);
  },
  'PUT /api/v1/namespace/:namespace/cron-jobs/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<void>,
  ) => {
    const { name, namespace } = req.params;
    await batch.replaceNamespacedCronJob(name, namespace, req.body);
    res.status(204).end();
  },
  'DELETE /api/v1/namespace/:namespace/cron-jobs/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<void>,
  ) => {
    const { name, namespace } = req.params;
    await batch.deleteNamespacedCronJob(name, namespace);
    res.status(204).end();
  },
};
