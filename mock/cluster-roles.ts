import { rabc } from '../config/kubernetes';

export default {
  'GET /api/v1/cluster-roles': async (req: any, res: any) => {
    const data = await rabc.listClusterRole();
    res.json(data.body.items);
  },
};
