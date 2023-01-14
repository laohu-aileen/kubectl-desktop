import { apps } from '../config/kubernetes';
import { Request, Response } from 'express';
import { V1Deployment } from '@kubernetes/client-node';

export default {
  'GET /api/v1/namespace/:namespace/deployments': async (
    req: Request<{ namespace: string }>,
    res: Response<V1Deployment[]>,
  ) => {
    const { namespace } = req.params;
    const data = await apps.listNamespacedDeployment(namespace);
    res.json(data.body.items);
  },
  'POST /api/v1/namespace/:namespace/deployments': async (
    req: Request<{ namespace: string }>,
    res: Response<V1Deployment>,
  ) => {
    const { namespace } = req.params;
    const data = await apps.createNamespacedDeployment(namespace, req.body);
    res.json(data.body);
  },
  'GET /api/v1/namespace/:namespace/deployments/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<V1Deployment>,
  ) => {
    const { name, namespace } = req.params;
    const data = await apps.readNamespacedDeployment(name, namespace);
    res.json(data.body);
  },
  'PUT /api/v1/namespace/:namespace/deployments/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<void>,
  ) => {
    const { name, namespace } = req.params;
    await apps.replaceNamespacedDeployment(name, namespace, req.body);
    res.status(204).end();
  },
  'DELETE /api/v1/namespace/:namespace/deployments/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<void>,
  ) => {
    const { name, namespace } = req.params;
    await apps.deleteNamespacedDeployment(name, namespace);
    res.status(204).end();
  },
};
