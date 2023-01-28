import type { V1CronJob } from '@kubernetes/client-node';
import type { IpcMainInvokeEvent } from 'electron';
import { batch } from '../kubernetes';

export const list = async (_: IpcMainInvokeEvent, namespace: string) => {
  const data = await batch.listNamespacedCronJob(namespace);
  return data.body.items;
};

export const create = async (
  _: IpcMainInvokeEvent,
  namespace: string,
  body: V1CronJob,
) => {
  const data = await batch.createNamespacedCronJob(namespace, body);
  return data.body;
};

export const read = async (
  _: IpcMainInvokeEvent,
  namespace: string,
  name: string,
) => {
  const data = await batch.readNamespacedCronJob(name, namespace);
  return data.body;
};

export const replace = (
  _: IpcMainInvokeEvent,
  namespace: string,
  name: string,
  body: V1CronJob,
) => {
  return batch.replaceNamespacedCronJob(name, namespace, body);
};

export const remove = (
  _: IpcMainInvokeEvent,
  namespace: string,
  name: string,
) => {
  return batch.deleteNamespacedCronJob(name, namespace);
};
