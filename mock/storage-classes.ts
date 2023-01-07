import { storage } from '../config/kubernetes';

export default {
  'GET /api/v1/storage-classes': async (req: any, res: any) => {
    const data = await storage.listStorageClass();
    res.json(data.body.items);
  },
};
