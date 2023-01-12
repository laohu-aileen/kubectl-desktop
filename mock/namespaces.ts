import { core } from '../config/kubernetes';

export default {
  'GET /api/v1/namespaces': async (req: any, res: any) => {
    const data = await core.listNamespace();
    res.json(data.body.items);
  },
  'GET /api/v1/namespaces/:name': async (req: any, res: any) => {
    const data = await core.readNamespace(req.params.name);
    res.json(data.body);
  },
  'POST /api/v1/namespaces': async (req: any, res: any) => {
    const data = await core.createNamespace(req.body);
    res.json(data.body);
  },
  'PUT /api/v1/namespaces/:name': async (req: any, res: any) => {
    await core.replaceNamespace(req.params.name, req.body);
    res.json();
  },
  'DELETE /api/v1/namespaces/:name': async (req: any, res: any) => {
    await core.deleteNamespace(req.params.name);
    res.json();
  },
};
