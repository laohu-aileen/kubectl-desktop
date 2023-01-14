import { core } from '../config/kubernetes';
import { Request, Response } from 'express';
import { V1Endpoints } from '@kubernetes/client-node';

export default {
  'GET /api/v1/namespace/:namespace/endpoints': async (
    req: Request<{ namespace: string }>,
    res: Response<V1Endpoints[]>,
  ) => {
    const { namespace } = req.params;
    const data = await core.listNamespacedEndpoints(namespace);
    res.json(data.body.items);
  },
  'POST /api/v1/namespace/:namespace/endpoints': async (
    req: Request<{ namespace: string }>,
    res: Response<V1Endpoints>,
  ) => {
    const { namespace } = req.params;
    const data = await core.createNamespacedEndpoints(namespace, req.body);
    res.json(data.body);
  },
  'GET /api/v1/namespace/:namespace/endpoints/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<V1Endpoints>,
  ) => {
    const { name, namespace } = req.params;
    const data = await core.readNamespacedEndpoints(name, namespace);
    res.json(data.body);
  },
  'PUT /api/v1/namespace/:namespace/endpoints/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<void>,
  ) => {
    const { name, namespace } = req.params;
    await core.replaceNamespacedEndpoints(name, namespace, req.body);
    res.status(204).end();
  },
  'DELETE /api/v1/namespace/:namespace/endpoints/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<void>,
  ) => {
    const { name, namespace } = req.params;
    await core.deleteNamespacedEndpoints(name, namespace);
    res.status(204).end();
  },
};
