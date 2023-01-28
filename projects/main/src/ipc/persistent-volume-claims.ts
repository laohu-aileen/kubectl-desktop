import type { V1PersistentVolumeClaim } from '@kubernetes/client-node';
import type { IpcMainInvokeEvent } from 'electron';
import { core } from '../kubernetes';

export const list = async (_: IpcMainInvokeEvent, namespace: string) => {
  const data = await core.listNamespacedPersistentVolumeClaim(namespace);
  return data.body.items;
};

export const create = async (
  _: IpcMainInvokeEvent,
  namespace: string,
  body: V1PersistentVolumeClaim,
) => {
  const data = await core.createNamespacedPersistentVolumeClaim(
    namespace,
    body,
  );
  return data.body;
};

export const read = async (
  _: IpcMainInvokeEvent,
  namespace: string,
  name: string,
) => {
  const data = await core.readNamespacedPersistentVolumeClaim(name, namespace);
  return data.body;
};

export const replace = (
  _: IpcMainInvokeEvent,
  namespace: string,
  name: string,
  body: V1PersistentVolumeClaim,
) => {
  return core.replaceNamespacedPersistentVolumeClaim(name, namespace, body);
};

export const remove = (
  _: IpcMainInvokeEvent,
  namespace: string,
  name: string,
) => {
  return core.deleteNamespacedPersistentVolumeClaim(name, namespace);
};
