import type { V1DaemonSet } from '@kubernetes/client-node';
import type { IpcMainInvokeEvent } from 'electron';
import { apps } from '../kubernetes';

export const list = async (_: IpcMainInvokeEvent, namespace: string) => {
  const data = await apps.listNamespacedDaemonSet(namespace);
  return data.body.items;
};

export const create = async (
  _: IpcMainInvokeEvent,
  namespace: string,
  body: V1DaemonSet,
) => {
  const data = await apps.createNamespacedDaemonSet(namespace, body);
  return data.body;
};

export const read = async (
  _: IpcMainInvokeEvent,
  namespace: string,
  name: string,
) => {
  const data = await apps.readNamespacedDaemonSet(name, namespace);
  return data.body;
};

export const replace = (
  _: IpcMainInvokeEvent,
  namespace: string,
  name: string,
  body: V1DaemonSet,
) => {
  return apps.replaceNamespacedDaemonSet(name, namespace, body);
};

export const remove = (
  _: IpcMainInvokeEvent,
  namespace: string,
  name: string,
) => {
  return apps.deleteNamespacedDaemonSet(name, namespace);
};
