import type { V1RoleBinding } from '@kubernetes/client-node';
import type { IpcMainInvokeEvent } from 'electron';
import { rabc } from '../kubernetes';

export const list = async (_: IpcMainInvokeEvent, namespace: string) => {
  const data = await rabc.listNamespacedRoleBinding(namespace);
  return data.body.items;
};

export const create = async (
  _: IpcMainInvokeEvent,
  namespace: string,
  body: V1RoleBinding,
) => {
  const data = await rabc.createNamespacedRoleBinding(namespace, body);
  return data.body;
};

export const read = async (
  _: IpcMainInvokeEvent,
  namespace: string,
  name: string,
) => {
  const data = await rabc.readNamespacedRoleBinding(name, namespace);
  return data.body;
};

export const replace = (
  namespace: string,
  name: string,
  body: V1RoleBinding,
) => {
  return rabc.replaceNamespacedRoleBinding(name, namespace, body);
};

export const remove = (
  _: IpcMainInvokeEvent,
  namespace: string,
  name: string,
) => {
  return rabc.deleteNamespacedRoleBinding(name, namespace);
};
