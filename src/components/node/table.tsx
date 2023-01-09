import { ProTable, ProColumns, ActionType } from '@ant-design/pro-components';
import { useRef } from 'react';
import { V1Node, V1NodeAddress } from '@kubernetes/client-node';
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
    },
    {
      title: '网络',
      dataIndex: ['status', 'addresses'],
      render: (value: V1NodeAddress[] & any) => {
        if (!(value instanceof Array)) return <div>-</div>;
        const data = value.map(({ type, address }) => `${type}:${address}`);
        return <TagColumn value={data} />;
      },
    },
    {
      title: '操作系统',
      valueType: 'text',
      dataIndex: ['status', 'nodeInfo', 'osImage'],
    },
    {
      title: 'CPU',
      valueType: 'text',
      dataIndex: ['status', 'capacity', 'cpu'],
    },
    {
      title: '内存',
      valueType: 'text',
      dataIndex: ['status', 'capacity', 'memory'],
    },
    {
      title: '磁盘',
      valueType: 'text',
      dataIndex: ['status', 'capacity', 'ephemeral-storage'],
    },
    {
      title: 'POD数',
      valueType: 'text',
      dataIndex: ['status', 'capacity', 'pods'],
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
