import { ProTable } from '@/components/table';
import { V1PersistentVolume } from '@kubernetes/client-node';
import { persistentVolume } from '@/services';

export default () => (
  <ProTable<V1PersistentVolume>
    api={persistentVolume}
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
        dataIndex: ['spec', 'capacity', 'storage'],
      },
      {
        title: '访问模式',
        valueType: 'tags',
        dataIndex: ['spec', 'accessModes'],
      },
      {
        title: '回收策略',
        dataIndex: ['spec', 'persistentVolumeReclaimPolicy'],
        valueEnum: {
          Retain: { text: '保留' },
          Delete: { text: '删除' },
          Recycle: { text: '回收' },
        },
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
        title: '绑定存储申明',
        valueType: 'text',
        dataIndex: ['spec', 'claimRef', 'name'],
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
