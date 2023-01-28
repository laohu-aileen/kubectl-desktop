import type { V1Endpoints } from '@kubernetes/client-node';
import type { IpcMainInvokeEvent } from 'electron';
import { core } from '../kubernetes';

export const list = async (_: IpcMainInvokeEvent, namespace: string) => {
  const data = await core.listNamespacedEndpoints(namespace);
  return data.body.items;
};

export const create = async (
  _: IpcMainInvokeEvent,
  namespace: string,
  body: V1Endpoints,
) => {
  const data = await core.createNamespacedEndpoints(namespace, body);
  return data.body;
};

export const read = async (
  _: IpcMainInvokeEvent,
  namespace: string,
  name: string,
) => {
  const data = await core.readNamespacedEndpoints(name, namespace);
  return data.body;
};

export const replace = (
  _: IpcMainInvokeEvent,
  namespace: string,
  name: string,
  body: V1Endpoints,
) => {
  return core.replaceNamespacedEndpoints(name, namespace, body);
};

export const remove = async (
  _: IpcMainInvokeEvent,
  namespace: string,
  name: string,
) => {
  return core.deleteNamespacedEndpoints(name, namespace);
};
