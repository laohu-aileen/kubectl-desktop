import { rabc } from '../config/kubernetes';
import { Request, Response } from 'express';
import { V1Role } from '@kubernetes/client-node';

export default {
  'GET /api/v1/namespace/:namespace/roles': async (
    req: Request<{ namespace: string }>,
    res: Response<V1Role[]>,
  ) => {
    const { namespace } = req.params;
    const data = await rabc.listNamespacedRole(namespace);
    res.json(data.body.items);
  },
  'POST /api/v1/namespace/:namespace/roles': async (
    req: Request<{ namespace: string }>,
    res: Response<V1Role>,
  ) => {
    const { namespace } = req.params;
    const data = await rabc.createNamespacedRole(namespace, req.body);
    res.json(data.body);
  },
  'GET /api/v1/namespace/:namespace/roles/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<V1Role>,
  ) => {
    const { name, namespace } = req.params;
    const data = await rabc.readNamespacedRole(name, namespace);
    res.json(data.body);
  },
  'PUT /api/v1/namespace/:namespace/roles/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<void>,
  ) => {
    const { name, namespace } = req.params;
    await rabc.replaceNamespacedRole(name, namespace, req.body);
    res.status(204).end();
  },
  'DELETE /api/v1/namespace/:namespace/roles/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<void>,
  ) => {
    const { name, namespace } = req.params;
    await rabc.deleteNamespacedRole(name, namespace);
    res.status(204).end();
  },
};
