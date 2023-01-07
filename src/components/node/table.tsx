import { ProTable, ProColumns, ActionType } from '@ant-design/pro-components';
import { useRef } from 'react';
import { V1Node } from '@kubernetes/client-node';
import { listNode } from '@/services';
import { TagColumn } from '../basic';
import { v1 as uuid } from 'uuid';

export const NodeTable = () => {
  const ref = useRef<ActionType>();
  const columns: ProColumns<V1Node>[] = [
    {
      title: '名称',
      valueType: 'text',
      dataIndex: ['metadata', 'name'],
      width: 300,
    },
    {
      title: '标签',
      dataIndex: ['metadata', 'labels'],
      render: (value: any) => <TagColumn value={value} />,
    },
    {
      title: '创建时间',
      dataIndex: ['metadata', 'creationTimestamp'],
      valueType: 'dateTime',
      width: 200,
    },
  ];

  return (
    <ProTable<V1Node>
      headerTitle="事件"
      actionRef={ref}
      search={false}
      columns={columns}
      pagination={false}
      polling={3000}
      rowKey={({ metadata }) => metadata?.uid || uuid()}
      request={async () => {
        const data = await listNode();
        return { data, success: true };
      }}
    />
  );
};
