import { node } from '@/services';
import { V1Node, V1NodeAddress } from '@kubernetes/client-node';
import { CluserResourceTable } from '../resource-table/cluser';

export const NodeTable = () => (
  <CluserResourceTable<V1Node>
    headerTitle="节点"
    api={node}
    columns={[
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
