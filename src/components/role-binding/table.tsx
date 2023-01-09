import { ProTable, ProColumns, ActionType } from '@ant-design/pro-components';
import { useRef } from 'react';
import { V1RoleBinding, V1Subject } from '@kubernetes/client-node';
import { listNamespacedRoleBinding, listNamespaceLabels } from '@/services';
import { v1 as uuid } from 'uuid';
import { TagColumn } from '../basic';

export const RoleBindingTable = () => {
  const ref = useRef<ActionType>();
  const columns: ProColumns<V1RoleBinding>[] = [
    {
      title: '角色',
      valueType: 'text',
      hideInSearch: true,
      dataIndex: ['roleRef', 'name'],
    },
    {
      title: '关联对象',
      dataIndex: 'subjects',
      hideInSearch: true,
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
      hideInSearch: true,
      width: 200,
    },
    {
      title: '命名空间',
      dataIndex: ['metadata', 'namespace'],
      valueType: 'select',
      request: listNamespaceLabels,
      initialValue: 'default',
      hideInTable: true,
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
    <ProTable<V1RoleBinding, V1RoleBinding>
      headerTitle="容器"
      actionRef={ref}
      columns={columns}
      options={{
        search: true,
        setting: false,
        fullScreen: false,
        density: false,
      }}
      pagination={{
        pageSize: 10,
      }}
      search={{
        filterType: 'light',
      }}
      rowKey={({ metadata }) => metadata?.uid || uuid()}
      request={async (params) => {
        if (!params.metadata?.namespace) return { success: true, data: [] };
        const data = await listNamespacedRoleBinding(params.metadata.namespace);
        if (!params.keyword) return { success: true, data };
        const keyword = params.keyword;
        return {
          success: true,
          data: data.filter(({ metadata }) => {
            if (!metadata?.name) return false;
            return metadata.name.indexOf(keyword) !== -1;
          }),
        };
      }}
    />
  );
};
