import { core } from '../config/kubernetes';
import { Request, Response } from 'express';
import { V1PersistentVolume } from '@kubernetes/client-node';

export default {
  'GET /api/v1/persistent-volumes': async (
    _: Request,
    res: Response<V1PersistentVolume[]>,
  ) => {
    const data = await core.listPersistentVolume();
    res.json(data.body.items);
  },
  'POST /api/v1/persistent-volumes': async (
    req: Request,
    res: Response<V1PersistentVolume>,
  ) => {
    const data = await core.createPersistentVolume(req.body);
    res.json(data.body);
  },
  'GET /api/v1/persistent-volumes/:name': async (
    req: Request<{ name: string }>,
    res: Response<V1PersistentVolume>,
  ) => {
    const { name } = req.params;
    const data = await core.readPersistentVolume(name);
    res.json(data.body);
  },
  'PUT /api/v1/persistent-volumes/:name': async (
    req: Request<{ name: string }>,
    res: Response<void>,
  ) => {
    const { name } = req.params;
    await core.replacePersistentVolume(name, req.body);
    res.status(204).end();
  },
  'DELETE /api/v1/persistent-volumes/:name': async (
    req: Request<{ name: string }>,
    res: Response<void>,
  ) => {
    const { name } = req.params;
    await core.deletePersistentVolume(name);
    res.status(204).end();
  },
};
