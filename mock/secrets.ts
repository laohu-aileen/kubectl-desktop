import { core } from '../config/kubernetes';

export default {
  'GET /api/v1/namespace/:namespace/secrets': async (req: any, res: any) => {
    const data = await core.listNamespacedSecret(req.params.namespace);
    res.json(data.body.items);
  },
  'GET /api/v1/namespace/:namespace/secrets/:name': async (
    req: any,
    res: any,
  ) => {
    const data = await core.readNamespacedSecret(
      req.params.name,
      req.params.namespace,
    );
    res.json(data.body);
  },
  'POST /api/v1/namespace/:namespace/secrets': async (req: any, res: any) => {
    const data = await core.createNamespacedSecret(
      req.params.namespace,
      req.body,
    );
    res.json(data.body);
  },
  'PUT /api/v1/namespace/:namespace/secrets/:name': async (
    req: any,
    res: any,
  ) => {
    await core.replaceNamespacedSecret(
      req.params.name,
      req.params.namespace,
      req.body,
    );
    res.json();
  },
  'DELETE /api/v1/namespace/:namespace/secrets/:name': async (
    req: any,
    res: any,
  ) => {
    await core.deleteNamespacedSecret(req.params.name, req.params.namespace);
    res.json();
  },
};
