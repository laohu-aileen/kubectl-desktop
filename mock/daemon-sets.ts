import { apps } from '../config/kubernetes';

export default {
  'GET /api/v1/namespace/:namespace/daemon-sets': async (
    req: any,
    res: any,
  ) => {
    const data = await apps.listNamespacedDaemonSet(req.params.namespace);
    res.json(data.body.items);
  },
};
