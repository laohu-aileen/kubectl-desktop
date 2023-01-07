import { rabc } from '../config/kubernetes';

export default {
  'GET /api/v1/namespace/:namespace/role-bindings': async (
    req: any,
    res: any,
  ) => {
    const data = await rabc.listNamespacedRoleBinding(req.params.namespace);
    res.json(data.body.items);
  },
};
