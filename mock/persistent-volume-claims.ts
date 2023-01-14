import { core } from '../config/kubernetes';
import { Request, Response } from 'express';
import { V1PersistentVolumeClaim } from '@kubernetes/client-node';

export default {
  'GET /api/v1/namespace/:namespace/persistent-volume-claims': async (
    req: Request<{ namespace: string }>,
    res: Response<V1PersistentVolumeClaim[]>,
  ) => {
    const { namespace } = req.params;
    const data = await core.listNamespacedPersistentVolumeClaim(namespace);
    res.json(data.body.items);
  },
  'POST /api/v1/namespace/:namespace/persistent-volume-claims': async (
    req: Request<{ namespace: string }>,
    res: Response<V1PersistentVolumeClaim>,
  ) => {
    const { namespace } = req.params;
    const data = await core.createNamespacedPersistentVolumeClaim(
      namespace,
      req.body,
    );
    res.json(data.body);
  },
  'GET /api/v1/namespace/:namespace/persistent-volume-claims/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<V1PersistentVolumeClaim>,
  ) => {
    const { name, namespace } = req.params;
    const data = await core.readNamespacedPersistentVolumeClaim(
      name,
      namespace,
    );
    res.json(data.body);
  },
  'PUT /api/v1/namespace/:namespace/persistent-volume-claims/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<void>,
  ) => {
    const { name, namespace } = req.params;
    await core.replaceNamespacedPersistentVolumeClaim(
      name,
      namespace,
      req.body,
    );
    res.status(204).end();
  },
  'DELETE /api/v1/namespace/:namespace/persistent-volume-claims/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<void>,
  ) => {
    const { name, namespace } = req.params;
    await core.deleteNamespacedPersistentVolumeClaim(name, namespace);
    res.status(204).end();
  },
};
