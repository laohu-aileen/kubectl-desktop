import {
  listNamespacedCronJob,
  listNamespacedJob,
  listNamespaceLabels,
} from '@/services';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { V1Container, V1CronJob, V1Job } from '@kubernetes/client-node';
import { Button } from 'antd';
import React, { useRef, useState } from 'react';
import { TagColumn } from '../basic';
import { v1 as uuid } from 'uuid';

type Job = V1Job | V1CronJob;

export const JobTable = () => {
  const ref = useRef<ActionType>();
  const [activeKey, setActiveKey] = useState<React.Key>('job');

  // 表字段
  const columns: ProColumns<Job>[] = [
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
    <ProTable<Job, Job>
      actionRef={ref}
      columns={columns}
      toolbar={{
        menu: {
          type: 'tab',
          activeKey,
          items: [
            {
              key: 'jobs',
              label: <span>任务</span>,
            },
            {
              key: 'cron-job',
              label: <span>定时任务</span>,
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
      request={async (params, sort, filter) => {
        console.log({ params, sort, filter });
        if (!params.metadata?.namespace) {
          return { success: true, data: [] };
        }
        const { namespace } = params.metadata;
        let data: Job[] = [];
        switch (activeKey) {
          case 'job': {
            data = await listNamespacedJob(namespace);
            break;
          }
          case 'cron-job': {
            data = await listNamespacedCronJob(namespace);
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
            return false;
          }),
        };
      }}
    />
  );
};
