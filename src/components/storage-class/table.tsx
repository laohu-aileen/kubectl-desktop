import { ProTable, ProColumns, ActionType } from '@ant-design/pro-components';
import { useRef } from 'react';
import { V1StorageClass } from '@kubernetes/client-node';
import { listStorageClass } from '@/services';
import { TagColumn } from '../basic';
import { v1 as uuid } from 'uuid';

export const StorageClassTable = () => {
  const ref = useRef<ActionType>();
  const columns: ProColumns<V1StorageClass>[] = [
    {
      title: '名称',
      valueType: 'text',
      dataIndex: ['metadata', 'name'],
    },
    {
      title: '提供者',
      dataIndex: 'provisioner',
    },
    {
      title: '参数',
      dataIndex: 'parameters',
      render: (value: any) => <TagColumn value={value} />,
    },
    {
      title: '回收策略',
      dataIndex: 'reclaimPolicy',
    },
    {
      title: '创建时间',
      dataIndex: ['metadata', 'creationTimestamp'],
      valueType: 'dateTime',
      width: 200,
    },
  ];

  return (
    <ProTable<V1StorageClass, V1StorageClass>
      headerTitle="存储类"
      actionRef={ref}
      search={false}
      columns={columns}
      pagination={false}
      polling={3000}
      rowKey={({ metadata }) => metadata?.uid || uuid()}
      request={async () => {
        const data = await listStorageClass();
        return { data, success: true };
      }}
    />
  );
};
