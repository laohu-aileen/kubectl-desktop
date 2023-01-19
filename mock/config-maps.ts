import { core } from '../config/kubernetes';
import { Request, Response } from 'express';
import { V1ConfigMap } from '@kubernetes/client-node';

export default {
  'GET /api/v1/namespace/:namespace/config-maps': async (
    req: Request<{ namespace: string }>,
    res: Response<V1ConfigMap[]>,
  ) => {
    try {
      const { namespace } = req.params;
      const data = await core.listNamespacedConfigMap(namespace);
      res.json(data.body.items);
    } catch (e: any) {
      console.log(e);
      res.status(500);
      res.json({ message: e.message } as any);
    }
  },
  'POST /api/v1/namespace/:namespace/config-maps': async (
    req: Request<{ namespace: string }>,
    res: Response<V1ConfigMap>,
  ) => {
    try {
      const { namespace } = req.params;
      const data = await core.createNamespacedConfigMap(namespace, req.body);
      res.json(data.body);
    } catch (e: any) {
      console.log(req.params, req.body);
      res.status(500);
      res.json({ message: e.message } as any);
    }
  },
  'GET /api/v1/namespace/:namespace/config-maps/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<V1ConfigMap>,
  ) => {
    try {
      const { name, namespace } = req.params;
      const data = await core.readNamespacedConfigMap(name, namespace);
      res.json(data.body);
    } catch (e: any) {
      res.status(500);
      res.json({ message: e.message } as any);
    }
  },
  'PUT /api/v1/namespace/:namespace/config-maps/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<void>,
  ) => {
    try {
      const { name, namespace } = req.params;
      await core.replaceNamespacedConfigMap(name, namespace, req.body);
      res.status(204).end();
    } catch (e: any) {
      console.log(req.params, req.body);
      res.status(500);
      res.json({ message: e.message } as any);
    }
  },
  'DELETE /api/v1/namespace/:namespace/config-maps/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<void>,
  ) => {
    try {
      const { name, namespace } = req.params;
      await core.deleteNamespacedConfigMap(name, namespace);
      res.status(204).end();
    } catch (e: any) {
      console.log(req.params);
      res.status(500);
      res.json({ message: e.message } as any);
    }
  },
};
