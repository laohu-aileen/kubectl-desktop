import { core } from '../config/kubernetes';
import { Request, Response } from 'express';
import { V1Pod } from '@kubernetes/client-node';

export default {
  'GET /api/v1/namespace/:namespace/pods': async (
    req: Request<{ namespace: string }>,
    res: Response<V1Pod[]>,
  ) => {
    try {
      const { namespace } = req.params;
      const data = await core.listNamespacedPod(namespace);
      res.json(data.body.items);
    } catch (e: any) {
      console.log(e, req.params, req.body);
      res.status(500);
      res.json({ message: e.message } as any);
    }
  },
  'POST /api/v1/namespace/:namespace/pods': async (
    req: Request<{ namespace: string }>,
    res: Response<V1Pod>,
  ) => {
    try {
      const { namespace } = req.params;
      const data = await core.createNamespacedPod(namespace, req.body);
      res.json(data.body);
    } catch (e: any) {
      console.log(e, req.params, req.body);
      res.status(500);
      res.json({ message: e.message } as any);
    }
  },
  'GET /api/v1/namespace/:namespace/pods/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<V1Pod>,
  ) => {
    try {
      const { name, namespace } = req.params;
      const data = await core.readNamespacedPod(name, namespace);
      res.json(data.body);
    } catch (e: any) {
      console.log(e, req.params, req.body);
      res.status(500);
      res.json({ message: e.message } as any);
    }
  },
  'PUT /api/v1/namespace/:namespace/pods/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<void>,
  ) => {
    try {
      const { name, namespace } = req.params;
      await core.replaceNamespacedPod(name, namespace, req.body);
      res.status(204).end();
    } catch (e: any) {
      console.log(e, req.params, req.body);
      res.status(500);
      res.json({ message: e.message } as any);
    }
  },
  'DELETE /api/v1/namespace/:namespace/pods/:name': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<void>,
  ) => {
    try {
      const { name, namespace } = req.params;
      await core.deleteNamespacedPod(name, namespace);
      res.status(204).end();
    } catch (e: any) {
      console.log(e, req.params, req.body);
      res.status(500);
      res.json({ message: e.message } as any);
    }
  },
  'GET /api/v1/namespace/:namespace/pods/:name/logs': async (
    req: Request<{ namespace: string; name: string }>,
    res: Response<string>,
  ) => {
    try {
      const { name, namespace } = req.params;
      const { container, lines } = req.query as any;
      const { body } = await core.readNamespacedPodLog(
        name,
        namespace,
        container,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        lines,
      );
      res.json(body);
    } catch (e: any) {
      console.log(e, req.params, req.body);
      res.status(500);
      res.json({ message: e.message } as any);
    }
  },
};
