import { core } from '../config/kubernetes';

export default {
  'GET /api/v1/namespace/:namespace/pods': async (req: any, res: any) => {
    const data = await core.listNamespacedPod(req.params.namespace);
    res.json(data.body.items);
  },
};
