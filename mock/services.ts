import { core } from '../config/kubernetes';

export default {
  'GET /api/v1/namespace/:namespace/services': async (req: any, res: any) => {
    const data = await core.listNamespacedService(req.params.namespace);
    res.json(data.body.items);
  },
};
