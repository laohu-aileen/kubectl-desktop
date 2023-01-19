import { ProTable } from '@/components/table';
import { CoreV1Event, V1ObjectReference } from '@kubernetes/client-node';
import { namespacedEvent } from '@/services';

export default () => (
  <ProTable<CoreV1Event>
    api={namespacedEvent}
    headerTitle="事件"
    pagination={false}
    columns={[
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
        renderText: ({ kind, name }: V1ObjectReference) => `${kind}:${name}`,
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
    ]}
  />
);
