import { core } from '../config/kubernetes';
import { Request, Response } from 'express';
import { V1ConfigMap } from '@kubernetes/client-node';

export default {
  'GET /api/v1/namespace/:namespace/config-maps': async (
    req: Request<{ namespace: string }>,
    res: Response<V1ConfigMap[]>,
  ) => {
    const { namespace } = req.params;
    const data = await core.listNamespacedConfigMap(namespace);
    res.json(data.body.items);
  },
  'POST /api/v1/namespace/:namespace/config-maps': async (
    req: Request<{ namespace: string }>,
    res: Response<V1ConfigMap>,
  ) => {
    const { namespace } = req.params;
    const data = await core.createNamespacedConfigMap(namespace, req.body);
    res.json(data.body);
  },
  'GET /api/v1/namespace/:namespace/config-maps/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<V1ConfigMap>,
  ) => {
    const { name, namespace } = req.params;
    const data = await core.readNamespacedConfigMap(name, namespace);
    res.json(data.body);
  },
  'PUT /api/v1/namespace/:namespace/config-maps/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<void>,
  ) => {
    const { name, namespace } = req.params;
    await core.replaceNamespacedConfigMap(name, namespace, req.body);
    res.status(204).end();
  },
  'DELETE /api/v1/namespace/:namespace/config-maps/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<void>,
  ) => {
    const { name, namespace } = req.params;
    await core.deleteNamespacedConfigMap(name, namespace);
    res.status(204).end();
  },
};
