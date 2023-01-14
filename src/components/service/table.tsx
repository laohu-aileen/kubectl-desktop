import { ProTable, ProColumns, ActionType } from '@ant-design/pro-components';
import { useRef } from 'react';
import { V1Service, V1ServicePort } from '@kubernetes/client-node';
import { namespacedService, namespaceLabels } from '@/services';
import { v1 as uuid } from 'uuid';
import { TagColumn } from '../basic';

export const ServiceTable = () => {
  const ref = useRef<ActionType>();
  const columns: ProColumns<V1Service>[] = [
    {
      title: '名称',
      valueType: 'text',
      dataIndex: ['metadata', 'name'],
      hideInSearch: true,
    },
    {
      title: '类型',
      valueType: 'text',
      dataIndex: ['spec', 'type'],
      hideInSearch: true,
    },
    {
      title: 'IP',
      valueType: 'text',
      dataIndex: ['spec', 'clusterIP'],
      hideInSearch: true,
    },
    {
      title: '端口',
      dataIndex: ['spec', 'ports'],
      hideInSearch: true,
      render: (value: V1ServicePort[] & any) => (
        <TagColumn
          value={value.map((item: V1ServicePort) => {
            let value = `${item.targetPort}`;
            if (item.nodePort) value += `:${item.nodePort}`;
            return `${value}/${item.protocol}`;
          })}
        />
      ),
    },
    {
      title: '选择器',
      dataIndex: ['spec', 'selector'],
      hideInSearch: true,
      render: (value: any) => <TagColumn value={value} />,
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
      request: namespaceLabels,
      initialValue: 'default',
      hideInTable: true,
      fieldProps: { allowClear: false },
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
    <ProTable<V1Service, V1Service>
      headerTitle="服务"
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
        const data = await namespacedService(params.metadata.namespace).list();
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
