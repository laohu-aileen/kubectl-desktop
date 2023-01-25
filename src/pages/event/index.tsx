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
        width: 80,
      },
      {
        title: '消息',
        valueType: 'text',
        dataIndex: 'message',
      },
      {
        title: '事件对象',
        valueType: 'text',
        dataIndex: 'involvedObject',
        renderText: ({ kind, name }: V1ObjectReference) => `${kind}:${name}`,
      },
      {
        title: '来源',
        valueType: 'text',
        dataIndex: ['source', 'component'],
        width: 200,
      },
      {
        title: '数量',
        valueType: 'text',
        dataIndex: 'count',
        width: 80,
      },
      {
        title: '时间',
        dataIndex: ['metadata', 'creationTimestamp'],
        valueType: 'fromNow',
        width: 200,
      },
    ]}
  />
);
