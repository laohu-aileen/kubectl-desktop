import { core } from '../config/kubernetes';

export default {
  'GET /api/v1/:namespace/service-accounts': async (req: any, res: any) => {
    const data = await core.listNamespacedServiceAccount(req.params.namespace);
    res.json(data.body.items);
  },
};
