import { ProTable, ProColumns, ActionType } from '@ant-design/pro-components';
import { useRef } from 'react';
import { V1PersistentVolume } from '@kubernetes/client-node';
import { listPersistentVolume } from '@/services';
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
      title: '类型',
      valueType: 'text',
      dataIndex: ['spec', 'storageClassName'],
    },
    {
      title: '空间',
      valueType: 'text',
      dataIndex: ['spec', 'capacity', 'storage'],
    },
    {
      title: '申请',
      valueType: 'text',
      dataIndex: ['spec', 'claimRef', 'name'],
    },
    {
      title: '状态',
      dataIndex: ['status', 'phase'],
      valueEnum: {
        Bound: { text: '活跃', status: 'Success' },
      },
    },
    {
      title: '创建时间',
      dataIndex: ['metadata', 'creationTimestamp'],
      valueType: 'dateTime',
      width: 200,
    },
    {
      title: '操作',
      valueType: 'option',
      hideInSearch: true,
      render: () => [
        <a key="info" type="primary">
          详情
        </a>,
        <a key="edit" type="primary">
          编辑
        </a>,
        <a key="delete" type="primary">
          删除
        </a>,
      ],
    },
  ];

  return (
    <ProTable<V1PersistentVolume, V1PersistentVolume>
      headerTitle="存储空间"
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
