import { ProTable, ProColumns, ActionType } from '@ant-design/pro-components';
import { useRef } from 'react';
import { V1PersistentVolumeClaim } from '@kubernetes/client-node';
import {
  listNamespacedPersistentVolumeClaim,
  listNamespaceLabels,
} from '@/services';
import { TagColumn } from '../basic';
import { v1 as uuid } from 'uuid';

export const PersistentVolumeClaimTable = () => {
  const ref = useRef<ActionType>();
  const columns: ProColumns<V1PersistentVolumeClaim>[] = [
    {
      title: '名称',
      valueType: 'text',
      dataIndex: ['metadata', 'name'],
      hideInSearch: true,
    },
    {
      title: '总量',
      valueType: 'text',
      dataIndex: ['spec', 'resources', 'requests', 'storage'],
      hideInSearch: true,
    },
    {
      title: '访问模式',
      valueType: 'text',
      dataIndex: ['spec', 'accessModes'],
      hideInSearch: true,
      render: (value: any) => <TagColumn value={value} />,
    },
    {
      title: '状态',
      dataIndex: ['status', 'phase'],
      hideInSearch: true,
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
      hideInSearch: true,
    },
    {
      title: '关联存储卷',
      valueType: 'text',
      dataIndex: ['spec', 'volumeName'],
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
      request: listNamespaceLabels,
      initialValue: 'default',
      hideInTable: true,
      fieldProps: { allowClear: false },
    },
  ];

  return (
    <ProTable<V1PersistentVolumeClaim, V1PersistentVolumeClaim>
      headerTitle="存储声明"
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
        const data = await listNamespacedPersistentVolumeClaim(
          params.metadata.namespace,
        );
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
