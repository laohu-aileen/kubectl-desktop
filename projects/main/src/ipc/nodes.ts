import { core } from '../kubernetes';

export const list = async () => {
  const data = await core.listNode();
  return data.body.items;
};
