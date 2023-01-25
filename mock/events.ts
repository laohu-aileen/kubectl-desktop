import { core } from '../config/kubernetes';
import { Request, Response } from 'express';
import { CoreV1Event } from '@kubernetes/client-node';

export default {
  'GET /api/v1/namespace/:namespace/events': async (
    req: Request<{ namespace: string }>,
    res: Response<CoreV1Event[]>,
  ) => {
    try {
      const { namespace } = req.params;
      const data = await core.listNamespacedEvent(namespace);
      res.json(data.body.items);
    } catch (e: any) {
      console.log(e);
      res.status(500);
      res.json({ message: e.message } as any);
    }
  },
};
