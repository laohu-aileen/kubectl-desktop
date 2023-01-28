import type { V1PersistentVolume } from '@kubernetes/client-node';
import type { IpcMainInvokeEvent } from 'electron';
import { core } from '../kubernetes';

export const list = async () => {
  const data = await core.listPersistentVolume();
  return data.body.items;
};

export const create = async (
  _: IpcMainInvokeEvent,
  body: V1PersistentVolume,
) => {
  const data = await core.createPersistentVolume(body);
  return data.body;
};

export const read = async (_: IpcMainInvokeEvent, name: string) => {
  const data = await core.readPersistentVolume(name);
  return data.body;
};

export const replace = async (
  _: IpcMainInvokeEvent,
  name: string,
  body: V1PersistentVolume,
) => {
  return core.replacePersistentVolume(name, body);
};

export const remove = async (_: IpcMainInvokeEvent, name: string) => {
  await core.deletePersistentVolume(name);
};
