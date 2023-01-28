import { ProTable } from '@/components/table';
import { node } from '@/services';
import type { V1Node, V1NodeAddress } from '@kubernetes/client-node';

export default () => (
  <ProTable<V1Node>
    api={node}
    headerTitle="节点"
    search={false}
    pagination={false}
    columns={[
      {
        title: '名称',
        valueType: 'text',
        dataIndex: ['metadata', 'name'],
      },
      {
        title: '操作系统',
        valueType: 'text',
        dataIndex: ['status', 'nodeInfo', 'osImage'],
      },
      {
        title: '网络',
        valueType: 'tags',
        dataIndex: ['status', 'addresses'],
        renderText: (value: V1NodeAddress[]) =>
          value.map(({ type, address }) => `${type}:${address}`),
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
    ]}
  />
);
