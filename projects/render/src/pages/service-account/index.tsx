import { ProTable } from '@/components/table';
import { namespacedServiceAccount } from '@/services';
import type { V1ServiceAccount } from '@kubernetes/client-node';

export default () => (
  <ProTable<V1ServiceAccount>
    api={namespacedServiceAccount}
    headerTitle="服务账户"
    pagination={false}
    columns={[
      {
        title: '名称',
        valueType: 'text',
        dataIndex: ['metadata', 'name'],
      },
      {
        title: '创建时间',
        dataIndex: ['metadata', 'creationTimestamp'],
        valueType: 'dateTime',
        width: 200,
      },
    ]}
  />
);
