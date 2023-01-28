import { rabc } from '../kubernetes';

export const list = async () => {
  const data = await rabc.listClusterRoleBinding();
  return data.body.items;
};
