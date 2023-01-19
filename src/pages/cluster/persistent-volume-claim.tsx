import { ProTable } from '@/components/table';
import { V1PersistentVolumeClaim } from '@kubernetes/client-node';
import { namespacedPersistentVolumeClaim } from '@/services';

export default () => (
  <ProTable<V1PersistentVolumeClaim>
    api={namespacedPersistentVolumeClaim}
    headerTitle="服务"
    pagination={false}
    columns={[
      {
        title: '名称',
        valueType: 'text',
        dataIndex: ['metadata', 'name'],
      },
      {
        title: '总量',
        valueType: 'text',
        dataIndex: ['spec', 'resources', 'requests', 'storage'],
      },
      {
        title: '访问模式',
        valueType: 'tags',
        dataIndex: ['spec', 'accessModes'],
      },
      {
        title: '状态',
        dataIndex: ['status', 'phase'],
        valueEnum: {
          Available: { text: '可用', status: 'Success' },
          Bound: { text: '绑定', status: 'Success' },
          Released: { text: '释放', status: 'Warning' },
          Failed: { text: '失败', status: 'Error' },
        },
      },
      {
        title: '存储类型',
        valueType: 'text',
        dataIndex: ['spec', 'storageClassName'],
      },
      {
        title: '关联存储卷',
        valueType: 'text',
        dataIndex: ['spec', 'volumeName'],
      },
      {
        title: '创建时间',
        dataIndex: ['metadata', 'creationTimestamp'],
        valueType: 'dateTime',
        width: 200,
      },
    ]}
  />
);
