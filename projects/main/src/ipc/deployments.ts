import type { V1Deployment } from '@kubernetes/client-node';
import type { IpcMainInvokeEvent } from 'electron';
import { apps } from '../kubernetes';

export const list = async (_: IpcMainInvokeEvent, namespace: string) => {
  const data = await apps.listNamespacedDeployment(namespace);
  return data.body.items;
};

export const create = async (
  _: IpcMainInvokeEvent,
  namespace: string,
  body: V1Deployment,
) => {
  const data = await apps.createNamespacedDeployment(namespace, body);
  return data.body;
};

export const read = async (
  _: IpcMainInvokeEvent,
  namespace: string,
  name: string,
) => {
  const data = await apps.readNamespacedDeployment(name, namespace);
  return data.body;
};

export const replace = (
  namespace: string,
  name: string,
  body: V1Deployment,
) => {
  return apps.replaceNamespacedDeployment(name, namespace, body);
};

export const remove = (
  _: IpcMainInvokeEvent,
  namespace: string,
  name: string,
) => {
  return apps.deleteNamespacedDeployment(name, namespace);
};
