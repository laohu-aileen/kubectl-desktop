import { core } from '../config/kubernetes';

export default {
  'GET /api/v1/persistent-volumes': async (req: any, res: any) => {
    const data = await core.listPersistentVolume();
    res.json(data.body.items);
  },
};
