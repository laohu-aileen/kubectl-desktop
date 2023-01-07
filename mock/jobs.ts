import { batch } from '../config/kubernetes';

export default {
  'GET /api/v1/namespace/:namespace/jobs': async (req: any, res: any) => {
    const data = await batch.listNamespacedJob(req.params.namespace);
    res.json(data.body.items);
  },
};
