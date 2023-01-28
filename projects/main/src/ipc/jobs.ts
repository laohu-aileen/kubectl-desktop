import type { V1Job } from '@kubernetes/client-node';
import type { IpcMainInvokeEvent } from 'electron';
import { batch } from '../kubernetes';

export const list = async (_: IpcMainInvokeEvent, namespace: string) => {
  const data = await batch.listNamespacedJob(namespace);
  return data.body.items;
};

export const create = async (
  _: IpcMainInvokeEvent,
  namespace: string,
  body: V1Job,
) => {
  const data = await batch.createNamespacedJob(namespace, body);
  return data.body;
};

export const read = async (
  _: IpcMainInvokeEvent,
  namespace: string,
  name: string,
) => {
  const data = await batch.readNamespacedJob(name, namespace);
  return data.body;
};

export const replace = (
  _: IpcMainInvokeEvent,
  namespace: string,
  name: string,
  body: V1Job,
) => {
  return batch.replaceNamespacedJob(name, namespace, body);
};

export const remove = (
  _: IpcMainInvokeEvent,
  namespace: string,
  name: string,
) => {
  return batch.deleteNamespacedJob(name, namespace);
};
