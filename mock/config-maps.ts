import { core } from '../config/kubernetes';

export default {
  'GET /api/v1/namespace/:namespace/config-maps': async (
    req: any,
    res: any,
  ) => {
    const data = await core.listNamespacedConfigMap(req.params.namespace);
    res.json(data.body.items);
  },
};
