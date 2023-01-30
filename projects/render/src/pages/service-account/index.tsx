import { FullPage } from '@/components/container';
import { ProTable } from '@/components/table';
import { namespacedServiceAccount } from '@/services';
import type { V1ServiceAccount } from '@kubernetes/client-node';

export default () => (
  <FullPage>
    <ProTable<V1ServiceAccount>
      api={namespacedServiceAccount}
      autoSize={true}
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
  </FullPage>
);
