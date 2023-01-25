import { ValueType } from '@/value-types';
import { ProColumns } from '@ant-design/pro-components';
import {
  V1Container,
  V1ContainerStatus,
  V1ObjectMeta,
  V1Pod,
} from '@kubernetes/client-node';
import { LinkProps } from 'react-router-dom';

export const columns: ProColumns<V1Pod, ValueType>[] = [
  {
    title: '名称',
    valueType: 'link',
    dataIndex: ['metadata'],
    renderText: (metadata: V1ObjectMeta): LinkProps => ({
      to: `./${metadata.namespace}/${metadata.name}`,
      children: metadata.name,
    }),
  },
  {
    title: '镜像',
    dataIndex: ['spec', 'containers'],
    valueType: 'tags',
    renderText: (value: V1Container[]) =>
      value?.map((item: V1Container) => item?.image),
  },
  {
    title: '重启',
    valueType: 'text',
    dataIndex: ['status', 'containerStatuses'],
    renderText: (value: V1ContainerStatus[]) => {
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
  },
  {
    title: 'QoS',
    valueType: 'text',
    dataIndex: ['status', 'qosClass'],
  },
  {
    title: '创建时间',
    dataIndex: ['metadata', 'creationTimestamp'],
    valueType: 'dateTime',
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
];
