import {
  listNamespacedDaemonSet,
  listNamespacedDeployment,
  listNamespacedStatefulSet,
  listNamespaceLabels,
} from '@/services';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import {
  V1Container,
  V1DaemonSet,
  V1Deployment,
  V1StatefulSet,
} from '@kubernetes/client-node';
import { Button } from 'antd';
import React, { useRef, useState } from 'react';
import { TagColumn } from '../basic';
import { v1 as uuid } from 'uuid';

type Workload = V1Deployment | V1StatefulSet | V1DaemonSet;

export const WorkloadProcessTable = () => {
  const ref = useRef<ActionType>();
  const [activeKey, setActiveKey] = useState<React.Key>('deployment');

  // 表字段
  const columns: ProColumns<Workload>[] = [
    {
      title: '名称',
      valueType: 'text',
      dataIndex: ['metadata', 'name'],
      hideInSearch: true,
    },
    {
      title: '容器组',
      dataIndex: 'status',
      hideInSearch: true,
      render: ({ readyReplicas, replicas }: any) =>
        `${readyReplicas}/${replicas}`,
    },
    {
      title: '镜像',
      dataIndex: ['spec', 'template', 'spec', 'containers'],
      hideInSearch: true,
      render: (value: V1Container[] & any) => {
        const list = value.map((item: V1Container) => item?.image);
        return <TagColumn value={list} />;
      },
    },
    {
      title: '创建时间',
      dataIndex: ['metadata', 'creationTimestamp'],
      valueType: 'dateTime',
      hideInSearch: true,
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
        <a key="replicas" type="primary">
          伸缩
        </a>,
        <a key="monitor" type="primary">
          监控
        </a>,
      ],
    },
  ];

  // 渲染页
  return (
    <ProTable<Workload, Workload>
      actionRef={ref}
      columns={columns}
      toolbar={{
        menu: {
          type: 'tab',
          activeKey,
          items: [
            {
              key: 'deployment',
              label: <span>无状态服务</span>,
            },
            {
              key: 'stateful-set',
              label: <span>有状态服务</span>,
            },
            {
              key: 'daemon-set',
              label: <span>守护进程集</span>,
            },
          ],
          onChange: (key) => {
            if (!key) return;
            setActiveKey(key);
            ref.current?.reload();
          },
        },
        actions: [
          <Button key="image" type="primary">
            镜像创建
          </Button>,
          <Button key="template">模板创建</Button>,
        ],
      }}
      pagination={{
        pageSize: 10,
      }}
      search={{
        filterType: 'light',
      }}
      options={{
        search: {
          placeholder: '名称/镜像',
        },
        setting: false,
        fullScreen: false,
        density: false,
      }}
      rowKey={({ metadata }) => metadata?.uid || uuid()}
      request={async (params) => {
        if (!params.metadata?.namespace) {
          return { success: true, data: [] };
        }
        const { namespace } = params.metadata;
        let data: Workload[] = [];
        switch (activeKey) {
          case 'deployment': {
            data = await listNamespacedDeployment(namespace);
            break;
          }
          case 'stateful-set': {
            data = await listNamespacedStatefulSet(namespace);
            break;
          }
          case 'daemon-set': {
            data = await listNamespacedDaemonSet(namespace);
            break;
          }
        }
        const keyword = params.keyword;
        if (!keyword) return { success: true, data };
        return {
          success: true,
          data: data.filter((item) => {
            if (
              item.metadata?.name &&
              item.metadata.name.indexOf(keyword) !== -1
            ) {
              return true;
            }
            if (item.spec?.template.spec?.containers) {
              for (const { image } of item.spec.template.spec.containers) {
                if (image?.indexOf(keyword) !== -1) return true;
              }
            }
            return false;
          }),
        };
      }}
    />
  );
};
