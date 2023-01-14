import { ProTable, ProColumns, ActionType } from '@ant-design/pro-components';
import { useRef } from 'react';
import { CoreV1Event, V1ObjectReference } from '@kubernetes/client-node';
import { namespacedEvent, namespaceLabels } from '@/services';
import { v1 as uuid } from 'uuid';
export const EventTable = () => {
  const ref = useRef<ActionType>();
  const columns: ProColumns<CoreV1Event>[] = [
    {
      title: '类型',
      valueType: 'text',
      dataIndex: 'type',
      hideInSearch: true,
      width: 80,
    },
    {
      title: '消息',
      valueType: 'text',
      dataIndex: 'message',
      hideInSearch: true,
    },
    {
      title: '事件对象',
      valueType: 'text',
      dataIndex: 'involvedObject',
      hideInSearch: true,
      render: ({ kind, name }: V1ObjectReference & any) => `${kind}:${name}`,
    },
    {
      title: '来源',
      valueType: 'text',
      dataIndex: ['source', 'component'],
      hideInSearch: true,
      width: 200,
    },
    {
      title: '数量',
      valueType: 'text',
      dataIndex: 'count',
      hideInSearch: true,
      width: 80,
    },
    {
      title: '时间',
      dataIndex: ['metadata', 'creationTimestamp'],
      valueType: 'fromNow',
      hideInSearch: true,
      width: 200,
    },
    {
      title: '命名空间',
      dataIndex: ['metadata', 'namespace'],
      valueType: 'select',
      request: namespaceLabels,
      initialValue: 'default',
      hideInTable: true,
      fieldProps: { allowClear: false },
    },
  ];

  return (
    <ProTable<CoreV1Event, CoreV1Event>
      headerTitle="节点"
      actionRef={ref}
      columns={columns}
      options={{
        search: true,
        setting: false,
        fullScreen: false,
        density: false,
      }}
      pagination={{
        pageSize: 10,
      }}
      search={{
        filterType: 'light',
      }}
      rowKey={({ metadata }) => metadata.uid || uuid()}
      request={async (params) => {
        if (!params.metadata.namespace) return { success: true, data: [] };
        const data = await namespacedEvent(params.metadata.namespace).list();
        if (!params.keyword) return { success: true, data };
        const keyword = params.keyword;
        return {
          success: true,
          data: data.filter(({ message }) => {
            if (!message) return false;
            return message.indexOf(keyword) !== -1;
          }),
        };
      }}
    />
  );
};
