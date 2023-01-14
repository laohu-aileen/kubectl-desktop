import { core } from '../config/kubernetes';
import { Request, Response } from 'express';
import { V1Service } from '@kubernetes/client-node';

export default {
  'GET /api/v1/namespace/:namespace/services': async (
    req: Request<{ namespace: string }>,
    res: Response<V1Service[]>,
  ) => {
    const { namespace } = req.params;
    const data = await core.listNamespacedService(namespace);
    res.json(data.body.items);
  },
  'POST /api/v1/namespace/:namespace/services': async (
    req: Request<{ namespace: string }>,
    res: Response<V1Service>,
  ) => {
    const { namespace } = req.params;
    const data = await core.createNamespacedService(namespace, req.body);
    res.json(data.body);
  },
  'GET /api/v1/namespace/:namespace/services/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<V1Service>,
  ) => {
    const { name, namespace } = req.params;
    const data = await core.readNamespacedService(name, namespace);
    res.json(data.body);
  },
  'PUT /api/v1/namespace/:namespace/services/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<void>,
  ) => {
    const { name, namespace } = req.params;
    await core.replaceNamespacedService(name, namespace, req.body);
    res.status(204).end();
  },
  'DELETE /api/v1/namespace/:namespace/services/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<void>,
  ) => {
    const { name, namespace } = req.params;
    await core.deleteNamespacedService(name, namespace);
    res.status(204).end();
  },
};
