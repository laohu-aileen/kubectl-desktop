import { valueTypeMap } from '@/value-types';
import { ProConfigProvider } from '@ant-design/pro-components';
import { Outlet } from '@umijs/max';

export default () => (
  <ProConfigProvider valueTypeMap={valueTypeMap} hashed={false}>
    <Outlet />
  </ProConfigProvider>
);
