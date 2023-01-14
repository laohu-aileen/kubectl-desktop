import { network } from '../config/kubernetes';
import { Request, Response } from 'express';
import { V1Ingress } from '@kubernetes/client-node';

export default {
  'GET /api/v1/namespace/:namespace/ingress': async (
    req: Request<{ namespace: string }>,
    res: Response<V1Ingress[]>,
  ) => {
    const { namespace } = req.params;
    const data = await network.listNamespacedIngress(namespace);
    res.json(data.body.items);
  },
  'POST /api/v1/namespace/:namespace/ingress': async (
    req: Request<{ namespace: string }>,
    res: Response<V1Ingress>,
  ) => {
    const { namespace } = req.params;
    const data = await network.createNamespacedIngress(namespace, req.body);
    res.json(data.body);
  },
  'GET /api/v1/namespace/:namespace/ingress/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<V1Ingress>,
  ) => {
    const { name, namespace } = req.params;
    const data = await network.readNamespacedIngress(name, namespace);
    res.json(data.body);
  },
  'PUT /api/v1/namespace/:namespace/ingress/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<void>,
  ) => {
    const { name, namespace } = req.params;
    await network.replaceNamespacedIngress(name, namespace, req.body);
    res.status(204).end();
  },
  'DELETE /api/v1/namespace/:namespace/ingress/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<void>,
  ) => {
    const { name, namespace } = req.params;
    await network.deleteNamespacedIngress(name, namespace);
    res.status(204).end();
  },
};
