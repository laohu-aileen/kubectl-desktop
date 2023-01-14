import { ProTable, ProColumns, ActionType } from '@ant-design/pro-components';
import { useRef } from 'react';
import { V1Container, V1ContainerStatus, V1Pod } from '@kubernetes/client-node';
import { namespacedPod, namespaceLabels } from '@/services';
import { v1 as uuid } from 'uuid';
import { TagColumn } from '../basic';

export const PodTable = () => {
  const ref = useRef<ActionType>();
  const columns: ProColumns<V1Pod>[] = [
    {
      title: '名称',
      valueType: 'text',
      dataIndex: ['metadata', 'name'],
      hideInSearch: true,
    },
    {
      title: '镜像',
      dataIndex: ['spec', 'containers'],
      hideInSearch: true,
      render: (value: V1Container[] & any) => {
        const list = value.map((item: V1Container) => item?.image);
        return <TagColumn value={list} />;
      },
    },
    {
      title: '重启',
      valueType: 'text',
      dataIndex: ['status', 'containerStatuses'],
      hideInSearch: true,
      render: (value: V1ContainerStatus[] & any) => {
        let count = 0;
        for (const { restartCount } of value) {
          count += restartCount;
        }
        return count;
      },
    },
    {
      title: 'IP',
      valueType: 'text',
      dataIndex: ['status', 'podIP'],
      hideInSearch: true,
    },
    {
      title: 'QoS',
      valueType: 'text',
      dataIndex: ['status', 'qosClass'],
      hideInSearch: true,
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
      title: '状态',
      dataIndex: ['status', 'phase'],
      valueEnum: {
        Succeeded: { text: '完成', status: 'Warning' },
        Running: { text: '运行', status: 'Success' },
      },
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
    <ProTable<V1Pod, V1Pod>
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
        const data = await namespacedPod(params.metadata.namespace).list();
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
