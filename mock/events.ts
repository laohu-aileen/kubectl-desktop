import { core } from '../config/kubernetes';
import { Request, Response } from 'express';
import { CoreV1Event } from '@kubernetes/client-node';

export default {
  'GET /api/v1/namespace/:namespace/events': async (
    req: Request<{ namespace: string }>,
    res: Response<CoreV1Event[]>,
  ) => {
    const { namespace } = req.params;
    const data = await core.listNamespacedEvent(namespace);
    res.json(data.body.items);
  },
};
