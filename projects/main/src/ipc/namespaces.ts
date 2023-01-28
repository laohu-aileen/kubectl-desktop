import type { V1Namespace } from '@kubernetes/client-node';
import type { IpcMainInvokeEvent } from 'electron';
import { core } from '../kubernetes';

export const list = async () => {
  const data = await core.listNamespace();
  return data.body.items;
};

export const create = async (_: IpcMainInvokeEvent, body: V1Namespace) => {
  const data = await core.createNamespace(body);
  return data.body;
};

export const read = async (_: IpcMainInvokeEvent, name: string) => {
  const data = await core.readNamespace(name);
  return data.body;
};

export const replace = (
  _: IpcMainInvokeEvent,
  name: string,
  body: V1Namespace,
) => {
  return core.replaceNamespace(name, body);
};

export const remove = async (_: IpcMainInvokeEvent, name: string) => {
  return core.deleteNamespace(name);
};
