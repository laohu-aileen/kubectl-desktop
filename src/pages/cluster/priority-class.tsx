import { ProTable } from '@/components/table';
import { V1PriorityClass } from '@kubernetes/client-node';
import { priorityClass } from '@/services';

export default () => (
  <ProTable<V1PriorityClass>
    api={priorityClass}
    headerTitle="权重策略"
    pagination={false}
    columns={[
      {
        title: '名称',
        valueType: 'text',
        dataIndex: ['metadata', 'name'],
      },
      {
        title: '描述',
        dataIndex: 'description',
      },
      {
        title: '优先策略',
        dataIndex: 'preemptionPolicy',
      },
      {
        title: '值',
        dataIndex: 'value',
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
