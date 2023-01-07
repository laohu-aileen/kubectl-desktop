import { batch } from '../config/kubernetes';

export default {
  'GET /api/v1/namespace/:namespace/cron-jobs': async (req: any, res: any) => {
    const data = await batch.listNamespacedCronJob(req.params.namespace);
    res.json(data.body.items);
  },
};
