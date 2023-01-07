import { apps } from '../config/kubernetes';

export default {
  'GET /api/v1/namespace/:namespace/deployments': async (
    req: any,
    res: any,
  ) => {
    const data = await apps.listNamespacedDeployment(req.params.namespace);
    res.json(data.body.items);
  },
};
