import { ProTable } from '@/components/table';
import { storageClass } from '@/services';
import type { V1StorageClass } from '@kubernetes/client-node';

export default () => (
  <ProTable<V1StorageClass>
    api={storageClass}
    headerTitle="存储类"
    pagination={false}
    columns={[
      {
        title: '名称',
        valueType: 'text',
        dataIndex: ['metadata', 'name'],
      },
      {
        title: '提供者',
        dataIndex: 'provisioner',
      },
      {
        title: '参数',
        dataIndex: 'parameters',
        valueType: 'tags',
      },
      {
        title: '回收策略',
        dataIndex: 'reclaimPolicy',
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
