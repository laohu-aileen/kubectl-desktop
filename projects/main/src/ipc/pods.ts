import type { V1Pod } from '@kubernetes/client-node';
import type { IpcMainInvokeEvent } from 'electron';
import { core } from '../kubernetes';

export const list = async (_: IpcMainInvokeEvent, namespace: string) => {
  const data = await core.listNamespacedPod(namespace);
  return data.body.items;
};

export const create = async (
  _: IpcMainInvokeEvent,
  namespace: string,
  body: V1Pod,
) => {
  const data = await core.createNamespacedPod(namespace, body);
  return data.body;
};

export const read = async (
  _: IpcMainInvokeEvent,
  namespace: string,
  name: string,
) => {
  const data = await core.readNamespacedPod(name, namespace);
  return data.body;
};

export const replace = (
  _: IpcMainInvokeEvent,
  namespace: string,
  name: string,
  body: V1Pod,
) => {
  return core.replaceNamespacedPod(name, namespace, body);
};

export const remove = (
  _: IpcMainInvokeEvent,
  namespace: string,
  name: string,
) => {
  return core.deleteNamespacedPod(name, namespace);
};
