import { ProMenuTable } from '@/components/table';
import {
  namespacedDaemonSet,
  namespacedDeployment,
  namespacedStatefulSet,
} from '@/services';
import type {
  V1Container,
  V1DaemonSet,
  V1Deployment,
  V1StatefulSet,
} from '@kubernetes/client-node';

export default () => (
  <ProMenuTable<V1Deployment | V1StatefulSet | V1DaemonSet>
    menus={[
      {
        key: 'deployment',
        headerTitle: '无状态服务',
        api: namespacedDeployment,
      },
      {
        key: 'stateful-set',
        headerTitle: '有状态服务',
        api: namespacedStatefulSet,
      },
      {
        key: 'daemon-set',
        headerTitle: '守护进程集',
        api: namespacedDaemonSet,
        columns: [],
      },
    ]}
    prevColumns={[
      {
        title: '名称',
        valueType: 'text',
        dataIndex: ['metadata', 'name'],
        hideInSearch: true,
      },
      {
        title: '容器组',
        dataIndex: 'status',
        hideInSearch: true,
        render: ({ readyReplicas, replicas }: any) =>
          `${readyReplicas}/${replicas}`,
      },
      {
        title: '镜像',
        valueType: 'tags',
        dataIndex: ['spec', 'template', 'spec', 'containers'],
        renderText: (value: V1Container[]) => value.map(({ image }) => image),
      },
      {
        title: '创建时间',
        dataIndex: ['metadata', 'creationTimestamp'],
        valueType: 'dateTime',
        hideInSearch: true,
      },
    ]}
  />
);
