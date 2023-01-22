import { core } from '../config/kubernetes';
import { Request, Response } from 'express';
import { V1PersistentVolumeClaim } from '@kubernetes/client-node';

export default {
  'GET /api/v1/namespace/:namespace/persistent-volume-claims': async (
    req: Request<{ namespace: string }>,
    res: Response<V1PersistentVolumeClaim[]>,
  ) => {
    try {
      const { namespace } = req.params;
      const data = await core.listNamespacedPersistentVolumeClaim(namespace);
      res.json(data.body.items);
    } catch (e: any) {
      console.log(e, req.params, req.body);
      res.status(500);
      res.json({ message: e.message } as any);
    }
  },
  'POST /api/v1/namespace/:namespace/persistent-volume-claims': async (
    req: Request<{ namespace: string }>,
    res: Response<V1PersistentVolumeClaim>,
  ) => {
    try {
      const { namespace } = req.params;
      const data = await core.createNamespacedPersistentVolumeClaim(
        namespace,
        req.body,
      );
      res.json(data.body);
    } catch (e: any) {
      console.log(e, req.params, req.body);
      res.status(500);
      res.json({ message: e.message } as any);
    }
  },
  'GET /api/v1/namespace/:namespace/persistent-volume-claims/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<V1PersistentVolumeClaim>,
  ) => {
    try {
      const { name, namespace } = req.params;
      const data = await core.readNamespacedPersistentVolumeClaim(
        name,
        namespace,
      );
      res.json(data.body);
    } catch (e: any) {
      console.log(e, req.params, req.body);
      res.status(500);
      res.json({ message: e.message } as any);
    }
  },
  'PUT /api/v1/namespace/:namespace/persistent-volume-claims/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<void>,
  ) => {
    try {
      const { name, namespace } = req.params;
      await core.replaceNamespacedPersistentVolumeClaim(
        name,
        namespace,
        req.body,
      );
      res.status(204).end();
    } catch (e: any) {
      console.log(e, req.params, req.body);
      res.status(500);
      res.json({ message: e.message } as any);
    }
  },
  'DELETE /api/v1/namespace/:namespace/persistent-volume-claims/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<void>,
  ) => {
    try {
      const { name, namespace } = req.params;
      await core.deleteNamespacedPersistentVolumeClaim(name, namespace);
      res.status(204).end();
    } catch (e: any) {
      console.log(e, req.params, req.body);
      res.status(500);
      res.json({ message: e.message } as any);
    }
  },
};
