import { V1DaemonSet } from '@kubernetes/client-node';
import { Request, Response } from 'express';
import { apps } from '../config/kubernetes';

export default {
  'GET /api/v1/namespace/:namespace/daemon-sets': async (
    req: Request<{ namespace: string }>,
    res: Response<V1DaemonSet[]>,
  ) => {
    const { namespace } = req.params;
    const data = await apps.listNamespacedDaemonSet(namespace);
    res.json(data.body.items);
  },
  'POST /api/v1/namespace/:namespace/daemon-sets': async (
    req: Request<{ namespace: string }>,
    res: Response<V1DaemonSet>,
  ) => {
    const { namespace } = req.params;
    const data = await apps.createNamespacedDaemonSet(namespace, req.body);
    res.json(data.body);
  },
  'GET /api/v1/namespace/:namespace/daemon-sets/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<V1DaemonSet>,
  ) => {
    const { name, namespace } = req.params;
    const data = await apps.readNamespacedDaemonSet(name, namespace);
    res.json(data.body);
  },
  'PUT /api/v1/namespace/:namespace/daemon-sets/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<void>,
  ) => {
    const { name, namespace } = req.params;
    await apps.replaceNamespacedDaemonSet(name, namespace, req.body);
    res.status(204).end();
  },
  'DELETE /api/v1/namespace/:namespace/daemon-sets/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<void>,
  ) => {
    const { name, namespace } = req.params;
    await apps.deleteNamespacedDaemonSet(name, namespace);
    res.status(204).end();
  },
};
