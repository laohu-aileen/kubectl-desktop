import { ProTable, ProColumns, ActionType } from '@ant-design/pro-components';
import { useRef } from 'react';
import { V1ClusterRoleBinding, V1Subject } from '@kubernetes/client-node';
import { clusterRoleBinding } from '@/services';
import { v1 as uuid } from 'uuid';
import { TagColumn } from '../basic';

export const ClusterRoleBindingTable = () => {
  const ref = useRef<ActionType>();
  const columns: ProColumns<V1ClusterRoleBinding>[] = [
    {
      title: '角色',
      valueType: 'text',
      dataIndex: ['roleRef', 'name'],
    },
    {
      title: '关联对象',
      dataIndex: 'subjects',
      render: (value: V1Subject[] & any) => {
        if (typeof value === 'string') return value;
        const data = value.map(
          ({ kind, name }: V1Subject) => `${kind}:${name}`,
        );
        return <TagColumn value={data} />;
      },
    },
    {
      title: '创建时间',
      dataIndex: ['metadata', 'creationTimestamp'],
      valueType: 'dateTime',
      width: 200,
    },
  ];

  return (
    <ProTable<V1ClusterRoleBinding, V1ClusterRoleBinding>
      headerTitle="集群角色绑定"
      actionRef={ref}
      search={false}
      columns={columns}
      pagination={false}
      polling={3000}
      rowKey={({ metadata }) => metadata?.uid || uuid()}
      request={async () => {
        const data = await clusterRoleBinding.list();
        return { data, success: true };
      }}
    />
  );
};
