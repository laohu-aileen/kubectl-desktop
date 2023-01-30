import { FullPage } from '@/components/container';
import { ProMenuTable } from '@/components/table';
import { namespacedCronJob, namespacedJob } from '@/services';
import type { V1Container, V1CronJob, V1Job } from '@kubernetes/client-node';

export default () => (
  <FullPage>
    <ProMenuTable<V1Job | V1CronJob | any>
      commonMenuProps={{
        autoSize: true,
      }}
      menus={[
        {
          key: 'job',
          headerTitle: '任务',
          api: namespacedJob,
        },
        {
          key: 'cron-job',
          headerTitle: '定时任务',
          api: namespacedCronJob,
        },
      ]}
      prevColumns={[
        {
          title: '名称',
          valueType: 'text',
          dataIndex: ['metadata', 'name'],
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
  </FullPage>
);
