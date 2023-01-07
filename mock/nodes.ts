import { core } from '../config/kubernetes';

export default {
  'GET /api/v1/nodes': async (req: any, res: any) => {
    const data = await core.listNode();
    res.json(data.body.items);
  },
};
