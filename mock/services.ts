import { core } from '../config/kubernetes';
import { Request, Response } from 'express';
import { V1Service } from '@kubernetes/client-node';

export default {
  'GET /api/v1/namespace/:namespace/services': async (
    req: Request<{ namespace: string }>,
    res: Response<V1Service[]>,
  ) => {
    try {
      const { namespace } = req.params;
      const data = await core.listNamespacedService(namespace);
      res.json(data.body.items);
    } catch (e: any) {
      res.status(500);
      res.json({ message: e.message } as any);
    }
  },
  'POST /api/v1/namespace/:namespace/services': async (
    req: Request<{ namespace: string }>,
    res: Response<V1Service>,
  ) => {
    try {
      const { namespace } = req.params;
      const data = await core.createNamespacedService(namespace, req.body);
      res.json(data.body);
    } catch (e: any) {
      console.log(e, req.params, req.body);
      res.status(500);
      res.json({ message: e.message } as any);
    }
  },
  'GET /api/v1/namespace/:namespace/services/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<V1Service>,
  ) => {
    try {
      const { name, namespace } = req.params;
      const data = await core.readNamespacedService(name, namespace);
      res.json(data.body);
    } catch (e: any) {
      console.log(e, req.params, req.body);
      res.status(500);
      res.json({ message: e.message } as any);
    }
  },
  'PUT /api/v1/namespace/:namespace/services/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<void>,
  ) => {
    try {
      const { name, namespace } = req.params;
      await core.replaceNamespacedService(name, namespace, req.body);
      res.status(204).end();
    } catch (e: any) {
      console.log(e, req.params, req.body);
      res.status(500);
      res.json({ message: e.message } as any);
    }
  },
  'DELETE /api/v1/namespace/:namespace/services/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<void>,
  ) => {
    try {
      const { name, namespace } = req.params;
      await core.deleteNamespacedService(name, namespace);
      res.status(204).end();
    } catch (e: any) {
      console.log(e, req.params, req.body);
      res.status(500);
      res.json({ message: e.message } as any);
    }
  },
};
