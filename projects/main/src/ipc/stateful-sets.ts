import type { V1StatefulSet } from '@kubernetes/client-node';
import type { IpcMainInvokeEvent } from 'electron';
import { apps } from '../kubernetes';

export const list = async (_: IpcMainInvokeEvent, namespace: string) => {
  const data = await apps.listNamespacedStatefulSet(namespace);
  return data.body.items;
};

export const create = async (
  _: IpcMainInvokeEvent,
  namespace: string,
  body: V1StatefulSet,
) => {
  const data = await apps.createNamespacedStatefulSet(namespace, body);
  return data.body;
};

export const read = async (
  _: IpcMainInvokeEvent,
  namespace: string,
  name: string,
) => {
  const data = await apps.readNamespacedStatefulSet(name, namespace);
  return data.body;
};

export const replace = (
  _: IpcMainInvokeEvent,
  namespace: string,
  name: string,
  body: V1StatefulSet,
) => {
  return apps.replaceNamespacedStatefulSet(name, namespace, body);
};

export const remove = (
  _: IpcMainInvokeEvent,
  namespace: string,
  name: string,
) => {
  return apps.deleteNamespacedStatefulSet(name, namespace);
};
