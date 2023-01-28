import type { V1ServiceAccount } from '@kubernetes/client-node';
import type { IpcMainInvokeEvent } from 'electron';
import { core } from '../kubernetes';

export const list = async (_: IpcMainInvokeEvent, namespace: string) => {
  const data = await core.listNamespacedServiceAccount(namespace);
  return data.body.items;
};

export const create = async (
  _: IpcMainInvokeEvent,
  namespace: string,
  body: V1ServiceAccount,
) => {
  const data = await core.createNamespacedServiceAccount(namespace, body);
  return data.body;
};

export const read = async (
  _: IpcMainInvokeEvent,
  namespace: string,
  name: string,
) => {
  const data = await core.readNamespacedServiceAccount(name, namespace);
  return data.body;
};

export const replace = (
  _: IpcMainInvokeEvent,
  namespace: string,
  name: string,
  body: V1ServiceAccount,
) => {
  return core.replaceNamespacedServiceAccount(name, namespace, body);
};

export const remove = (
  _: IpcMainInvokeEvent,
  namespace: string,
  name: string,
) => {
  return core.deleteNamespacedServiceAccount(name, namespace);
};
