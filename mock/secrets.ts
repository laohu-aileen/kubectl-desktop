import { core } from '../config/kubernetes';
import { Request, Response } from 'express';
import { V1Secret } from '@kubernetes/client-node';

export default {
  'GET /api/v1/namespace/:namespace/secrets': async (
    req: Request<{ namespace: string }>,
    res: Response<V1Secret[]>,
  ) => {
    const { namespace } = req.params;
    const data = await core.listNamespacedSecret(namespace);
    res.json(data.body.items);
  },
  'POST /api/v1/namespace/:namespace/secrets': async (
    req: Request<{ namespace: string }>,
    res: Response<V1Secret>,
  ) => {
    const { namespace } = req.params;
    const data = await core.createNamespacedSecret(namespace, req.body);
    res.json(data.body);
  },
  'GET /api/v1/namespace/:namespace/secrets/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<V1Secret>,
  ) => {
    const { name, namespace } = req.params;
    const data = await core.readNamespacedSecret(name, namespace);
    res.json(data.body);
  },
  'PUT /api/v1/namespace/:namespace/secrets/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<void>,
  ) => {
    const { name, namespace } = req.params;
    await core.replaceNamespacedSecret(name, namespace, req.body);
    res.status(204).end();
  },
  'DELETE /api/v1/namespace/:namespace/secrets/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<void>,
  ) => {
    const { name, namespace } = req.params;
    await core.deleteNamespacedSecret(name, namespace);
    res.status(204).end();
  },
};
