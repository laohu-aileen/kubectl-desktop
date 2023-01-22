import { core } from '../config/kubernetes';
import { Request, Response } from 'express';
import { V1PersistentVolume } from '@kubernetes/client-node';

export default {
  'GET /api/v1/persistent-volumes': async (
    _: Request,
    res: Response<V1PersistentVolume[]>,
  ) => {
    try {
      const data = await core.listPersistentVolume();
      res.json(data.body.items);
    } catch (e: any) {
      console.log(e);
      res.status(500);
      res.json({ message: e.message } as any);
    }
  },
  'POST /api/v1/persistent-volumes': async (
    req: Request,
    res: Response<V1PersistentVolume>,
  ) => {
    try {
      const data = await core.createPersistentVolume(req.body);
      res.json(data.body);
    } catch (e: any) {
      console.log(e, req.params, req.body);
      res.status(500);
      res.json({ message: e.message } as any);
    }
  },
  'GET /api/v1/persistent-volumes/:name': async (
    req: Request<{ name: string }>,
    res: Response<V1PersistentVolume>,
  ) => {
    try {
      const { name } = req.params;
      const data = await core.readPersistentVolume(name);
      res.json(data.body);
    } catch (e: any) {
      console.log(e, req.params, req.body);
      res.status(500);
      res.json({ message: e.message } as any);
    }
  },
  'PUT /api/v1/persistent-volumes/:name': async (
    req: Request<{ name: string }>,
    res: Response<void>,
  ) => {
    try {
      const { name } = req.params;
      await core.replacePersistentVolume(name, req.body);
      res.status(204).end();
    } catch (e: any) {
      console.log(e, req.params, req.body);
      res.status(500);
      res.json({ message: e.message } as any);
    }
  },
  'DELETE /api/v1/persistent-volumes/:name': async (
    req: Request<{ name: string }>,
    res: Response<void>,
  ) => {
    try {
      const { name } = req.params;
      await core.deletePersistentVolume(name);
      res.status(204).end();
    } catch (e: any) {
      console.log(e, req.params, req.body);
      res.status(500);
      res.json({ message: e.message } as any);
    }
  },
};
