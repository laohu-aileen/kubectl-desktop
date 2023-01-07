import { core } from '../config/kubernetes';

export default {
  'GET /api/v1/namespace/:namespace/endpoints': async (req: any, res: any) => {
    const data = await core.listNamespacedEndpoints(req.params.namespace);
    res.json(data.body.items);
  },
};
