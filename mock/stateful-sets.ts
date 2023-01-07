import { apps } from '../config/kubernetes';

export default {
  'GET /api/v1/namespace/:namespace/stateful-sets': async (
    req: any,
    res: any,
  ) => {
    const data = await apps.listNamespacedStatefulSet(req.params.namespace);
    res.json(data.body.items);
  },
};
