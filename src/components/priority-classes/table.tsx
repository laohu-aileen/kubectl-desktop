import { ProTable, ProColumns, ActionType } from '@ant-design/pro-components';
import { useRef } from 'react';
import { V1PriorityClass } from '@kubernetes/client-node';
import { listPriorityClass } from '@/services';
import { v1 as uuid } from 'uuid';

export const PriorityClassTable = () => {
  const ref = useRef<ActionType>();
  const columns: ProColumns<V1PriorityClass>[] = [
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
  ];

  return (
    <ProTable<V1PriorityClass, V1PriorityClass>
      headerTitle="权重策略"
      actionRef={ref}
      search={false}
      columns={columns}
      pagination={false}
      polling={3000}
      rowKey={({ metadata }) => metadata?.uid || uuid()}
      request={async () => {
        const data = await listPriorityClass();
        return { data, success: true };
      }}
    />
  );
};
