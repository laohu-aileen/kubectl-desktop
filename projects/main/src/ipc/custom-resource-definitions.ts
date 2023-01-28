import { extension } from '../kubernetes';

export const list = async () => {
  const data = await extension.listCustomResourceDefinition();
  return data.body.items;
};
