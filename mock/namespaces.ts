import { Namespace } from '@/services/namespaces';
import { client } from '../config/kubernetes';

export default {
  'GET /api/v1/namespaces': async (req: any, res: any) => {
    const data = await client.api.v1.namespaces.get();
    res.json(
      data.body.items.map(
        ({ metadata, status }: any): Namespace => ({
          uid: metadata.uid,
          name: metadata.name,
          creationTimestamp: Date.parse(metadata.creationTimestamp),
          labels: metadata.labels || {},
          status: status.phase,
        }),
      ),
    );
  },
};
