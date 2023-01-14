import { storage } from '../config/kubernetes';
import { Request, Response } from 'express';
import { V1StorageClass } from '@kubernetes/client-node';

export default {
  'GET /api/v1/storage-classes': async (
    _: Request,
    res: Response<V1StorageClass[]>,
  ) => {
    const data = await storage.listStorageClass();
    res.json(data.body.items);
  },
  'POST /api/v1/storage-classes': async (
    req: Request,
    res: Response<V1StorageClass>,
  ) => {
    const data = await storage.createStorageClass(req.body);
    res.json(data.body);
  },
  'GET /api/v1/storage-classes/:name': async (
    req: Request<{ name: string }>,
    res: Response<V1StorageClass>,
  ) => {
    const { name } = req.params;
    const data = await storage.readStorageClass(name);
    res.json(data.body);
  },
  'PUT /api/v1/storage-classes/:name': async (
    req: Request<{ name: string }>,
    res: Response<void>,
  ) => {
    const { name } = req.params;
    await storage.replaceStorageClass(name, req.body);
    res.status(204).end();
  },
  'DELETE /api/v1/storage-classes/:name': async (
    req: Request<{ name: string }>,
    res: Response<void>,
  ) => {
    const { name } = req.params;
    await storage.deleteStorageClass(name);
    res.status(204).end();
  },
};
