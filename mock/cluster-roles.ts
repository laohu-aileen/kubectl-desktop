import { rabc } from '../config/kubernetes';
import { Request, Response } from 'express';
import { V1ClusterRole } from '@kubernetes/client-node';

export default {
  'GET /api/v1/cluster-roles': async (
    _: Request,
    res: Response<V1ClusterRole[]>,
  ) => {
    const data = await rabc.listClusterRole();
    res.json(data.body.items);
  },
};
