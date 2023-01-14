import { V1StatefulSet } from '@kubernetes/client-node';
import { Request, Response } from 'express';
import { apps } from '../config/kubernetes';

export default {
  'GET /api/v1/namespace/:namespace/stateful-sets': async (
    req: Request<{ namespace: string }>,
    res: Response<V1StatefulSet[]>,
  ) => {
    const { namespace } = req.params;
    const data = await apps.listNamespacedStatefulSet(namespace);
    res.json(data.body.items);
  },
  'POST /api/v1/namespace/:namespace/stateful-sets': async (
    req: Request<{ namespace: string }>,
    res: Response<V1StatefulSet>,
  ) => {
    const { namespace } = req.params;
    const data = await apps.createNamespacedStatefulSet(namespace, req.body);
    res.json(data.body);
  },
  'GET /api/v1/namespace/:namespace/stateful-sets/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<V1StatefulSet>,
  ) => {
    const { name, namespace } = req.params;
    const data = await apps.readNamespacedStatefulSet(name, namespace);
    res.json(data.body);
  },
  'PUT /api/v1/namespace/:namespace/stateful-sets/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<void>,
  ) => {
    const { name, namespace } = req.params;
    await apps.replaceNamespacedStatefulSet(name, namespace, req.body);
    res.status(204).end();
  },
  'DELETE /api/v1/namespace/:namespace/stateful-sets/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<void>,
  ) => {
    const { name, namespace } = req.params;
    await apps.deleteNamespacedStatefulSet(name, namespace);
    res.status(204).end();
  },
};
