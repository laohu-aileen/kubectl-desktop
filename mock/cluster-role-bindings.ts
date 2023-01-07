import { rabc } from '../config/kubernetes';

export default {
  'GET /api/v1/cluster-role-bindings': async (req: any, res: any) => {
    const data = await rabc.listClusterRoleBinding();
    res.json(data.body.items);
  },
};
