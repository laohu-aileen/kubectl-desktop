import { extension } from '../config/kubernetes';
import { Request, Response } from 'express';
import { V1CustomResourceDefinition } from '@kubernetes/client-node';

export default {
  'GET /api/v1/custom-resource-definitions': async (
    _: Request,
    res: Response<V1CustomResourceDefinition[]>,
  ) => {
    const data = await extension.listCustomResourceDefinition();
    res.json(data.body.items);
  },
};
