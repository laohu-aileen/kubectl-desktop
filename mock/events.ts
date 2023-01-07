import { core } from '../config/kubernetes';

export default {
  'GET /api/v1/namespace/:namespace/events': async (req: any, res: any) => {
    const data = await core.listNamespacedEvent(req.params.namespace);
    res.json(data.body.items);
  },
};
