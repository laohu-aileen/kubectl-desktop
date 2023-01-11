import { core } from '../config/kubernetes';

export default {
  'GET /api/v1/namespace/:namespace/config-maps': async (
    req: any,
    res: any,
  ) => {
    const data = await core.listNamespacedConfigMap(req.params.namespace);
    res.json(data.body.items);
  },
  'GET /api/v1/namespace/:namespace/config-maps/:name': async (
    req: any,
    res: any,
  ) => {
    const data = await core.readNamespacedConfigMap(
      req.params.name,
      req.params.namespace,
    );
    res.json(data.body);
  },
  'POST /api/v1/namespace/:namespace/config-maps': async (
    req: any,
    res: any,
  ) => {
    const data = await core.createNamespacedConfigMap(
      req.params.namespace,
      req.body,
    );
    res.json(data.body);
  },
  'PUT /api/v1/namespace/:namespace/config-maps/:name': async (
    req: any,
    res: any,
  ) => {
    await core.replaceNamespacedConfigMap(
      req.params.name,
      req.params.namespace,
      req.body,
    );
    res.json();
  },
  'DELETE /api/v1/namespace/:namespace/config-maps/:name': async (
    req: any,
    res: any,
  ) => {
    await core.deleteNamespacedConfigMap(req.params.name, req.params.namespace);
    res.json();
  },
};
