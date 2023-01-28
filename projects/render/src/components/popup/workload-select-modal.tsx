import {
  namespacedCronJob,
  namespacedDaemonSet,
  namespacedDeployment,
  namespacedJob,
  namespacedStatefulSet,
} from '@/services';
import { ImportOutlined } from '@ant-design/icons';
import type {
  V1Container,
  V1CronJob,
  V1DaemonSet,
  V1Deployment,
  V1Job,
  V1StatefulSet,
} from '@kubernetes/client-node';
import { Button } from 'antd';
import { useRef } from 'react';
import type { ModalAction } from '../table';
import { ModalMenuTable } from '../table';

/**
 * 负载资源类型
 */
export type WorkloadType =
  | V1Deployment
  | V1StatefulSet
  | V1DaemonSet
  | V1CronJob
  | V1Job;

/**
 * 负载选择器参数
 */
export interface WorkloadSelectModalProps {
  namespace: string;
  trigger?: JSX.Element;
  onSelect?: (value: WorkloadType) => void;
}

/**
 * 负载选择器
 *
 * @returns
 */
export const WorkloadSelectModal = (props: WorkloadSelectModalProps) => {
  const modalRef = useRef<ModalAction>();
  const trigger = props.trigger || (
    <Button icon={<ImportOutlined />} type="link">
      从现有负载资源中导入标签
    </Button>
  );
  return (
    <ModalMenuTable<WorkloadType>
      width={1000}
      modalRef={modalRef}
      trigger={trigger}
      commonMenuProps={{
        options: {
          search: true,
        },
      }}
      menus={[
        {
          key: 'deployment',
          headerTitle: '无状态服务',
          api: namespacedDeployment(props.namespace),
          itemActionsRender: (record) => [
            <a
              key="selected"
              onClick={() => {
                modalRef.current?.close();
                if (!props.onSelect) return;
                props.onSelect(record);
              }}
            >
              添加
            </a>,
          ],
        },
        {
          key: 'stateful-set',
          headerTitle: '有状态服务',
          api: namespacedStatefulSet(props.namespace),
        },
        {
          key: 'daemon-set',
          headerTitle: '守护进程集',
          api: namespacedDaemonSet(props.namespace),
        },
        {
          key: 'cron-job',
          headerTitle: '定时任务',
          api: namespacedCronJob(props.namespace),
        },
        {
          key: 'job',
          headerTitle: '任务',
          api: namespacedJob(props.namespace),
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
          title: '镜像',
          valueType: 'tags',
          dataIndex: ['spec', 'template', 'spec', 'containers'],
          renderText: (value: V1Container[]) => value.map(({ image }) => image),
        },
      ]}
    />
  );
};
