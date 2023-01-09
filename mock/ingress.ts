import { network } from '../config/kubernetes';

export default {
  'GET /api/v1/namespace/:namespace/ingress': async (req: any, res: any) => {
    const data = await network.listNamespacedIngress(req.params.namespace);
    res.json(data.body.items);
  },
};
