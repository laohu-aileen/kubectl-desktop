import { core } from '../config/kubernetes';

export default {
  'GET /api/v1/namespace/:namespace/persistent-volume-claims': async (
    req: any,
    res: any,
  ) => {
    const data = await core.listNamespacedPersistentVolumeClaim(
      req.params.namespace,
    );
    res.json(data.body.items);
  },
};
