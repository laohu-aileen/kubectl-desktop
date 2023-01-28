import type { V1Ingress } from '@kubernetes/client-node';
import type { IpcMainInvokeEvent } from 'electron';
import { network } from '../kubernetes';

export const list = async (_: IpcMainInvokeEvent, namespace: string) => {
  const data = await network.listNamespacedIngress(namespace);
  return data.body.items;
};

export const create = async (
  _: IpcMainInvokeEvent,
  namespace: string,
  body: V1Ingress,
) => {
  const data = await network.createNamespacedIngress(namespace, body);
  return data.body;
};

export const read = async (
  _: IpcMainInvokeEvent,
  namespace: string,
  name: string,
) => {
  const data = await network.readNamespacedIngress(name, namespace);
  return data.body;
};

export const replace = (
  _: IpcMainInvokeEvent,
  namespace: string,
  name: string,
  body: V1Ingress,
) => {
  return network.replaceNamespacedIngress(name, namespace, body);
};

export const remove = (
  _: IpcMainInvokeEvent,
  namespace: string,
  name: string,
) => {
  return network.deleteNamespacedIngress(name, namespace);
};
