import { core } from '../config/kubernetes';
import { Request, Response } from 'express';
import { V1Namespace } from '@kubernetes/client-node';

export default {
  'GET /api/v1/namespaces': async (
    _: Request,
    res: Response<V1Namespace[]>,
  ) => {
    const data = await core.listNamespace();
    res.json(data.body.items);
  },
  'POST /api/v1/namespaces': async (
    req: Request,
    res: Response<V1Namespace>,
  ) => {
    const data = await core.createNamespace(req.body);
    res.json(data.body);
  },
  'GET /api/v1/namespaces/:name': async (
    req: Request<{ name: string }>,
    res: Response<V1Namespace>,
  ) => {
    const { name } = req.params;
    const data = await core.readNamespace(name);
    res.json(data.body);
  },
  'PUT /api/v1/namespaces/:name': async (
    req: Request<{ name: string }>,
    res: Response<void>,
  ) => {
    const { name } = req.params;
    await core.replaceNamespace(name, req.body);
    res.status(204).end();
  },
  'DELETE /api/v1/namespaces/:name': async (
    req: Request<{ name: string }>,
    res: Response<void>,
  ) => {
    const { name } = req.params;
    await core.deleteNamespace(name);
    res.status(204).end();
  },
};
