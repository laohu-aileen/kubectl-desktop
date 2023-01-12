import { ProTable, ProColumns, ActionType } from '@ant-design/pro-components';
import { useRef } from 'react';
import { V1PersistentVolume } from '@kubernetes/client-node';
import { listPersistentVolume } from '@/services';
import { TagColumn } from '../basic';
import { v1 as uuid } from 'uuid';

export const PersistentVolumeTable = () => {
  const ref = useRef<ActionType>();
  const columns: ProColumns<V1PersistentVolume>[] = [
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
      valueType: 'text',
      dataIndex: ['spec', 'accessModes'],
      hideInSearch: true,
      render: (value: any) => <TagColumn value={value} />,
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
  ];

  return (
    <ProTable<V1PersistentVolume, V1PersistentVolume>
      headerTitle="存储卷"
      actionRef={ref}
      search={false}
      columns={columns}
      pagination={false}
      polling={3000}
      rowKey={({ metadata }) => metadata?.uid || uuid()}
      request={async () => {
        const data = await listPersistentVolume();
        return { data, success: true };
      }}
    />
  );
};
