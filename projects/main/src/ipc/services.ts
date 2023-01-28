import type { V1Service } from '@kubernetes/client-node';
import type { IpcMainInvokeEvent } from 'electron';
import { core } from '../kubernetes';

export const list = async (_: IpcMainInvokeEvent, namespace: string) => {
  const data = await core.listNamespacedService(namespace);
  return data.body.items;
};

export const create = async (
  _: IpcMainInvokeEvent,
  namespace: string,
  body: V1Service,
) => {
  const data = await core.createNamespacedService(namespace, body);
  return data.body;
};

export const read = async (
  _: IpcMainInvokeEvent,
  namespace: string,
  name: string,
) => {
  const data = await core.readNamespacedService(name, namespace);
  return data.body;
};

export const replace = (
  _: IpcMainInvokeEvent,
  namespace: string,
  name: string,
  body: V1Service,
) => {
  return core.replaceNamespacedService(name, namespace, body);
};

export const remove = (namespace: string, name: string) => {
  return core.deleteNamespacedService(name, namespace);
};
