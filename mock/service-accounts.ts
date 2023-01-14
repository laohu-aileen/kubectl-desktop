import { core } from '../config/kubernetes';
import { Request, Response } from 'express';
import { V1ServiceAccount } from '@kubernetes/client-node';

export default {
  'GET /api/v1/namespace/:namespace/service-accounts': async (
    req: Request<{ namespace: string }>,
    res: Response<V1ServiceAccount[]>,
  ) => {
    const { namespace } = req.params;
    const data = await core.listNamespacedServiceAccount(namespace);
    res.json(data.body.items);
  },
  'POST /api/v1/namespace/:namespace/service-accounts': async (
    req: Request<{ namespace: string }>,
    res: Response<V1ServiceAccount>,
  ) => {
    const { namespace } = req.params;
    const data = await core.createNamespacedServiceAccount(namespace, req.body);
    res.json(data.body);
  },
  'GET /api/v1/namespace/:namespace/service-accounts/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<V1ServiceAccount>,
  ) => {
    const { name, namespace } = req.params;
    const data = await core.readNamespacedServiceAccount(name, namespace);
    res.json(data.body);
  },
  'PUT /api/v1/namespace/:namespace/service-accounts/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<void>,
  ) => {
    const { name, namespace } = req.params;
    await core.replaceNamespacedServiceAccount(name, namespace, req.body);
    res.status(204).end();
  },
  'DELETE /api/v1/namespace/:namespace/service-accounts/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<void>,
  ) => {
    const { name, namespace } = req.params;
    await core.deleteNamespacedServiceAccount(name, namespace);
    res.status(204).end();
  },
};
