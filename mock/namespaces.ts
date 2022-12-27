import { Namespace } from '@/services/namespaces';
import { client } from '../config/kubernetes';

const toNamespace = ({ metadata, status }: any): Namespace => ({
  uid: metadata.uid,
  name: metadata.name,
  creationTimestamp: Date.parse(metadata.creationTimestamp),
  labels: metadata.labels || {},
  status: status.phase,
});

export default {
  'GET /api/v1/namespaces': async (req: any, res: any) => {
    const data = await client.api.v1.ns.get();
    res.json(data.body.items.map(toNamespace));
  },
  'POST /api/v1/namespaces': async (req: any, res: any) => {
    const data: Namespace = req.body;
    const value = await client.api.v1.ns.post({
      body: {
        apiVersion: 'v1',
        kind: 'Namespace',
        metadata: {
          name: data.name,
          labels: data.labels || {},
        },
      },
    });
    res.json(toNamespace(value.body));
  },
  'PUT /api/v1/namespaces/:name': async (req: any, res: any) => {
    const data: Namespace = req.body;
    await client.api.v1.ns(req.params.name).put({
      body: {
        apiVersion: 'v1',
        kind: 'Namespace',
        metadata: {
          name: req.params.name,
          labels: data.labels || {},
        },
      },
    });
    res.end();
  },
  'DELETE /api/v1/namespaces/:name': async (req: any, res: any) => {
    await client.api.v1.ns(req.params.name).delete();
    res.end();
  },
};
