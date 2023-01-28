import type { V1PriorityClass } from '@kubernetes/client-node';
import type { IpcMainInvokeEvent } from 'electron';
import { schedule } from '../kubernetes';

export const list = async () => {
  const data = await schedule.listPriorityClass();
  return data.body.items;
};

export const create = async (_: IpcMainInvokeEvent, body: V1PriorityClass) => {
  const data = await schedule.createPriorityClass(body);
  return data.body;
};

export const read = async (_: IpcMainInvokeEvent, name: string) => {
  const data = await schedule.readPriorityClass(name);
  return data.body;
};

export const replace = (
  _: IpcMainInvokeEvent,
  name: string,
  body: V1PriorityClass,
) => {
  return schedule.replacePriorityClass(name, body);
};

export const remove = async (_: IpcMainInvokeEvent, name: string) => {
  await schedule.deletePriorityClass(name);
};
