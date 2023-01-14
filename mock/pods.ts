import { core } from '../config/kubernetes';
import { Request, Response } from 'express';
import { V1Pod } from '@kubernetes/client-node';

export default {
  'GET /api/v1/namespace/:namespace/pods': async (
    req: Request<{ namespace: string }>,
    res: Response<V1Pod[]>,
  ) => {
    const { namespace } = req.params;
    const data = await core.listNamespacedPod(namespace);
    res.json(data.body.items);
  },
  'POST /api/v1/namespace/:namespace/pods': async (
    req: Request<{ namespace: string }>,
    res: Response<V1Pod>,
  ) => {
    const { namespace } = req.params;
    const data = await core.createNamespacedPod(namespace, req.body);
    res.json(data.body);
  },
  'GET /api/v1/namespace/:namespace/pods/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<V1Pod>,
  ) => {
    const { name, namespace } = req.params;
    const data = await core.readNamespacedPod(name, namespace);
    res.json(data.body);
  },
  'PUT /api/v1/namespace/:namespace/pods/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<void>,
  ) => {
    const { name, namespace } = req.params;
    await core.replaceNamespacedPod(name, namespace, req.body);
    res.status(204).end();
  },
  'DELETE /api/v1/namespace/:namespace/pods/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<void>,
  ) => {
    const { name, namespace } = req.params;
    await core.deleteNamespacedPod(name, namespace);
    res.status(204).end();
  },
};
