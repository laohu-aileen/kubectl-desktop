import { core } from '../config/kubernetes';
import { Request, Response } from 'express';
import { V1Node } from '@kubernetes/client-node';

export default {
  'GET /api/v1/nodes': async (_: Request, res: Response<V1Node[]>) => {
    const data = await core.listNode();
    res.json(data.body.items);
  },
};
