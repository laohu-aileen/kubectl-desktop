import { ProTable } from '@/components/table';
import { V1Ingress } from '@kubernetes/client-node';
import { namespacedIngress } from '@/services';

export default () => (
  <ProTable<V1Ingress>
    api={namespacedIngress}
    headerTitle="路由"
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
