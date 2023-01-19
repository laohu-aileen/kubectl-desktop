import { rabc } from '../config/kubernetes';
import { Request, Response } from 'express';
import { V1ClusterRoleBinding } from '@kubernetes/client-node';

export default {
  'GET /api/v1/cluster-role-bindings': async (
    _: Request,
    res: Response<V1ClusterRoleBinding[]>,
  ) => {
    try {
      const data = await rabc.listClusterRoleBinding();
      res.json(data.body.items);
    } catch (e: any) {
      res.status(500);
      res.json({ message: e.message } as any);
    }
  },
};
