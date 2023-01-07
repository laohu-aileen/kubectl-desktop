import { extension } from '../config/kubernetes';

export default {
  'GET /api/v1/custom-resource-definitions': async (req: any, res: any) => {
    const data = await extension.listCustomResourceDefinition();
    res.json(data.body.items);
  },
};
