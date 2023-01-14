import { schedule } from '../config/kubernetes';
import { Request, Response } from 'express';
import { V1PriorityClass } from '@kubernetes/client-node';

export default {
  'GET /api/v1/priority-classes': async (
    _: Request,
    res: Response<V1PriorityClass[]>,
  ) => {
    const data = await schedule.listPriorityClass();
    res.json(data.body.items);
  },
  'POST /api/v1/priority-classes': async (
    req: Request,
    res: Response<V1PriorityClass>,
  ) => {
    const data = await schedule.createPriorityClass(req.body);
    res.json(data.body);
  },
  'GET /api/v1/priority-classes/:name': async (
    req: Request<{ name: string }>,
    res: Response<V1PriorityClass>,
  ) => {
    const { name } = req.params;
    const data = await schedule.readPriorityClass(name);
    res.json(data.body);
  },
  'PUT /api/v1/priority-classes/:name': async (
    req: Request<{ name: string }>,
    res: Response<void>,
  ) => {
    const { name } = req.params;
    await schedule.replacePriorityClass(name, req.body);
    res.status(204).end();
  },
  'DELETE /api/v1/priority-classes/:name': async (
    req: Request<{ name: string }>,
    res: Response<void>,
  ) => {
    const { name } = req.params;
    await schedule.deletePriorityClass(name);
    res.status(204).end();
  },
};
