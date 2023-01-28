import type { V1Role } from '@kubernetes/client-node';
import type { IpcMainInvokeEvent } from 'electron';
import { rabc } from '../kubernetes';

export const list = async (_: IpcMainInvokeEvent, namespace: string) => {
  const data = await rabc.listNamespacedRole(namespace);
  return data.body.items;
};

export const create = async (
  _: IpcMainInvokeEvent,
  namespace: string,
  body: V1Role,
) => {
  const data = await rabc.createNamespacedRole(namespace, body);
  return data.body;
};

export const read = async (
  _: IpcMainInvokeEvent,
  namespace: string,
  name: string,
) => {
  const data = await rabc.readNamespacedRole(name, namespace);
  return data.body;
};

export const replace = (
  _: IpcMainInvokeEvent,
  namespace: string,
  name: string,
  body: V1Role,
) => {
  return rabc.replaceNamespacedRole(name, namespace, body);
};

export const remove = (
  _: IpcMainInvokeEvent,
  namespace: string,
  name: string,
) => {
  return rabc.deleteNamespacedRole(name, namespace);
};
