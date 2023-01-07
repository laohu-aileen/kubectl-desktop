import { rabc } from '../config/kubernetes';

export default {
  'GET /api/v1/namespace/:namespace/roles': async (req: any, res: any) => {
    const data = await rabc.listNamespacedRole(req.params.namespace);
    res.json(data.body.items);
  },
};
