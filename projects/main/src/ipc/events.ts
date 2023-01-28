import { core } from '../kubernetes';

export const list = async (namespace: string) => {
  const data = await core.listNamespacedEvent(namespace);
  return data.body.items;
};
