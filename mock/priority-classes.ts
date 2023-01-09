import { schedule } from '../config/kubernetes';

export default {
  'GET /api/v1/priority-classes': async (req: any, res: any) => {
    const data = await schedule.listPriorityClass();
    res.json(data.body.items);
  },
};
