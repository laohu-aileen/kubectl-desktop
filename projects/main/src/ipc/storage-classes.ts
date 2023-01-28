import type { V1StorageClass } from '@kubernetes/client-node';
import type { IpcMainInvokeEvent } from 'electron';
import { storage } from '../kubernetes';

export const list = async () => {
  const data = await storage.listStorageClass();
  return data.body.items;
};

export const create = async (_: IpcMainInvokeEvent, body: V1StorageClass) => {
  const data = await storage.createStorageClass(body);
  return data.body;
};

export const read = async (_: IpcMainInvokeEvent, name: string) => {
  const data = await storage.readStorageClass(name);
  return data.body;
};

export const replace = (
  _: IpcMainInvokeEvent,
  name: string,
  body: V1StorageClass,
) => {
  return storage.replaceStorageClass(name, body);
};

export const remove = (_: IpcMainInvokeEvent, name: string) => {
  return storage.deleteStorageClass(name);
};
