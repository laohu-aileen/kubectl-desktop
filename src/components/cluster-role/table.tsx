import { ProTable, ProColumns, ActionType } from '@ant-design/pro-components';
import { useRef } from 'react';
import { V1ClusterRole } from '@kubernetes/client-node';
import { clusterRole } from '@/services';
import { v1 as uuid } from 'uuid';

export const ClusterRoleTable = () => {
  const ref = useRef<ActionType>();
  const columns: ProColumns<V1ClusterRole>[] = [
    {
      title: '名称',
      valueType: 'text',
      dataIndex: ['metadata', 'name'],
    },
    {
      title: '创建时间',
      dataIndex: ['metadata', 'creationTimestamp'],
      valueType: 'dateTime',
      width: 200,
    },
  ];

  return (
    <ProTable<V1ClusterRole, V1ClusterRole>
      headerTitle="集群角色"
      actionRef={ref}
      search={false}
      columns={columns}
      pagination={false}
      polling={3000}
      rowKey={({ metadata }) => metadata?.uid || uuid()}
      request={async () => {
        const data = await clusterRole.list();
        return { data, success: true };
      }}
    />
  );
};
