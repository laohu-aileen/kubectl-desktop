import { rabc } from '../kubernetes';

export const list = async () => {
  const data = await rabc.listClusterRole();
  return data.body.items;
};
