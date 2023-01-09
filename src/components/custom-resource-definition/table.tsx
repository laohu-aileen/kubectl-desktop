import { ProTable, ProColumns, ActionType } from '@ant-design/pro-components';
import { useRef } from 'react';
import {
  V1CustomResourceDefinition,
  V1CustomResourceDefinitionVersion,
} from '@kubernetes/client-node';
import { listCustomResourceDefinition } from '@/services';
import { v1 as uuid } from 'uuid';
import { TagColumn } from '../basic';

export const CustomResourceDefinitionTable = () => {
  const ref = useRef<ActionType>();
  const columns: ProColumns<V1CustomResourceDefinition>[] = [
    {
      title: '名称',
      valueType: 'text',
      dataIndex: ['metadata', 'name'],
    },
    {
      title: '组',
      valueType: 'text',
      dataIndex: ['spec', 'group'],
    },
    {
      title: '版本',
      dataIndex: ['spec', 'versions'],
      hideInSearch: true,
      render: (value: V1CustomResourceDefinitionVersion[] & any) => {
        if (typeof value === 'string') return value;
        return (
          <TagColumn
            value={value.map(
              ({ name }: V1CustomResourceDefinitionVersion) => name,
            )}
          />
        );
      },
    },
    {
      title: '作用域',
      valueType: 'text',
      dataIndex: ['spec', 'scope'],
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
    <ProTable<V1CustomResourceDefinition, V1CustomResourceDefinition>
      headerTitle="扩展"
      actionRef={ref}
      search={false}
      columns={columns}
      pagination={false}
      polling={3000}
      rowKey={({ metadata }) => metadata?.uid || uuid()}
      request={async () => {
        const data = await listCustomResourceDefinition();
        return { data, success: true };
      }}
    />
  );
};
