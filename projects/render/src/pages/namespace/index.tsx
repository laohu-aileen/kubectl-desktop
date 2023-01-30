import { FullPage } from '@/components/container';
import { ProTable } from '@/components/table';
import { namespace } from '@/services';
import type { V1Namespace } from '@kubernetes/client-node';

export default () => (
  <FullPage>
    <ProTable<V1Namespace>
      api={namespace}
      autoSize={true}
      headerTitle="命名空间"
      pagination={false}
      formProps={{}}
      columns={[
        {
          title: '名称',
          valueType: 'text',
          dataIndex: ['metadata', 'name'],
        },
        {
          title: '标签',
          valueType: 'tags',
          dataIndex: ['metadata', 'labels'],
        },
        {
          title: '状态',
          dataIndex: ['status', 'phase'],
          width: 180,
          valueEnum: {
            Active: {
              text: '运行中',
              status: 'Success',
            },
            Terminating: {
              text: '停止中',
              status: 'Warning',
            },
          },
        },
        {
          title: '创建时间',
          dataIndex: ['metadata', 'creationTimestamp'],
          valueType: 'dateTime',
          width: 200,
        },
      ]}
    />
  </FullPage>
);
