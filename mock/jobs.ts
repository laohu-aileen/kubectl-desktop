import { batch } from '../config/kubernetes';
import { Request, Response } from 'express';
import { V1Job } from '@kubernetes/client-node';

export default {
  'GET /api/v1/namespace/:namespace/jobs': async (
    req: Request<{ namespace: string }>,
    res: Response<V1Job[]>,
  ) => {
    const { namespace } = req.params;
    const data = await batch.listNamespacedJob(namespace);
    res.json(data.body.items);
  },
  'POST /api/v1/namespace/:namespace/jobs': async (
    req: Request<{ namespace: string }>,
    res: Response<V1Job>,
  ) => {
    const { namespace } = req.params;
    const data = await batch.createNamespacedJob(namespace, req.body);
    res.json(data.body);
  },
  'GET /api/v1/namespace/:namespace/jobs/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<V1Job>,
  ) => {
    const { name, namespace } = req.params;
    const data = await batch.readNamespacedJob(name, namespace);
    res.json(data.body);
  },
  'PUT /api/v1/namespace/:namespace/jobs/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<void>,
  ) => {
    const { name, namespace } = req.params;
    await batch.replaceNamespacedJob(name, namespace, req.body);
    res.status(204).end();
  },
  'DELETE /api/v1/namespace/:namespace/jobs/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<void>,
  ) => {
    const { name, namespace } = req.params;
    await batch.deleteNamespacedJob(name, namespace);
    res.status(204).end();
  },
};
