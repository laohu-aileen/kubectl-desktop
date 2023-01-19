import { ProTable } from '@/components/table';
import { V1Container, V1ContainerStatus, V1Pod } from '@kubernetes/client-node';
import { namespacedPod } from '@/services';

export default () => (
  <ProTable<V1Pod>
    api={namespacedPod}
    headerTitle="容器"
    pagination={false}
    columns={[
      {
        title: '名称',
        valueType: 'text',
        dataIndex: ['metadata', 'name'],
        hideInSearch: true,
      },
      {
        title: '镜像',
        dataIndex: ['spec', 'containers'],
        valueType: 'tags',
        hideInSearch: true,
        renderText: (value: V1Container[] & any) =>
          value?.map((item: V1Container) => item?.image),
      },
      {
        title: '重启',
        valueType: 'text',
        dataIndex: ['status', 'containerStatuses'],
        hideInSearch: true,
        render: (value: V1ContainerStatus[] & any) => {
          let count = 0;
          for (const { restartCount } of value) {
            count += restartCount;
          }
          return count;
        },
      },
      {
        title: 'IP',
        valueType: 'text',
        dataIndex: ['status', 'podIP'],
        hideInSearch: true,
      },
      {
        title: 'QoS',
        valueType: 'text',
        dataIndex: ['status', 'qosClass'],
        hideInSearch: true,
      },
      {
        title: '创建时间',
        dataIndex: ['metadata', 'creationTimestamp'],
        valueType: 'dateTime',
        hideInSearch: true,
        width: 200,
      },
      {
        title: '状态',
        dataIndex: ['status', 'phase'],
        valueEnum: {
          Succeeded: { text: '完成', status: 'Warning' },
          Running: { text: '运行', status: 'Success' },
        },
      },
    ]}
  />
);
