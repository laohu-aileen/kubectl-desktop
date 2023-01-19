import { core } from '../config/kubernetes';
import { Request, Response } from 'express';
import { V1Namespace } from '@kubernetes/client-node';

export default {
  'GET /api/v1/namespaces': async (
    _: Request,
    res: Response<V1Namespace[]>,
  ) => {
    try {
      const data = await core.listNamespace();
      res.json(data.body.items);
    } catch (e: any) {
      res.status(500);
      res.json({ message: e.message } as any);
    }
  },
  'POST /api/v1/namespaces': async (
    req: Request,
    res: Response<V1Namespace>,
  ) => {
    try {
      const data = await core.createNamespace(req.body);
      res.json(data.body);
    } catch (e: any) {
      console.log(req.params, req.body);
      res.status(500);
      res.json({ message: e.message } as any);
    }
  },
  'GET /api/v1/namespaces/:name': async (
    req: Request<{ name: string }>,
    res: Response<V1Namespace>,
  ) => {
    try {
      const { name } = req.params;
      const data = await core.readNamespace(name);
      res.json(data.body);
    } catch (e: any) {
      res.status(500);
      res.json({ message: e.message } as any);
    }
  },
  'PUT /api/v1/namespaces/:name': async (
    req: Request<{ name: string }>,
    res: Response<void>,
  ) => {
    try {
      const { name } = req.params;
      await core.replaceNamespace(name, req.body);
      res.status(204).end();
    } catch (e: any) {
      console.log(req.params, req.body);
      res.status(500);
      res.json({ message: e.message } as any);
    }
  },
  'DELETE /api/v1/namespaces/:name': async (
    req: Request<{ name: string }>,
    res: Response<void>,
  ) => {
    try {
      const { name } = req.params;
      await core.deleteNamespace(name);
      res.status(204).end();
    } catch (e: any) {
      res.status(500);
      res.json({ message: e.message } as any);
    }
  },
};
