import { rabc } from '../config/kubernetes';
import { Request, Response } from 'express';
import { V1RoleBinding } from '@kubernetes/client-node';

export default {
  'GET /api/v1/namespace/:namespace/role-bindings': async (
    req: Request<{ namespace: string }>,
    res: Response<V1RoleBinding[]>,
  ) => {
    const { namespace } = req.params;
    const data = await rabc.listNamespacedRoleBinding(namespace);
    res.json(data.body.items);
  },
  'POST /api/v1/namespace/:namespace/role-bindings': async (
    req: Request<{ namespace: string }>,
    res: Response<V1RoleBinding>,
  ) => {
    const { namespace } = req.params;
    const data = await rabc.createNamespacedRoleBinding(namespace, req.body);
    res.json(data.body);
  },
  'GET /api/v1/namespace/:namespace/role-bindings/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<V1RoleBinding>,
  ) => {
    const { name, namespace } = req.params;
    const data = await rabc.readNamespacedRoleBinding(name, namespace);
    res.json(data.body);
  },
  'PUT /api/v1/namespace/:namespace/role-bindings/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<void>,
  ) => {
    const { name, namespace } = req.params;
    await rabc.replaceNamespacedRoleBinding(name, namespace, req.body);
    res.status(204).end();
  },
  'DELETE /api/v1/namespace/:namespace/role-bindings/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<void>,
  ) => {
    const { name, namespace } = req.params;
    await rabc.deleteNamespacedRoleBinding(name, namespace);
    res.status(204).end();
  },
};
