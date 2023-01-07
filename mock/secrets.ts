import { core } from '../config/kubernetes';

export default {
  'GET /api/v1/namespace/:namespace/secrets': async (req: any, res: any) => {
    const data = await core.listNamespacedSecret(req.params.namespace);
    res.json(data.body.items);
  },
};
