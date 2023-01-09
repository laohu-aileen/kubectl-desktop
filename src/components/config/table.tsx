import {
  listNamespacedConfigMap,
  listNamespacedSecret,
  listNamespaceLabels,
} from '@/services';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { V1ConfigMap, V1Secret } from '@kubernetes/client-node';
import React, { useRef, useState } from 'react';
import { v1 as uuid } from 'uuid';

type Config = V1ConfigMap | V1Secret;

export const ConfigTable = () => {
  const ref = useRef<ActionType>();
  const [activeKey, setActiveKey] = useState<React.Key>('config-map');

  // 公共字段
  const columns: ProColumns<Config>[] = [
    {
      title: '名称',
      valueType: 'text',
      dataIndex: ['metadata', 'name'],
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
  ];

  // 保密字典专有名词
  if (activeKey === 'secret') {
    columns.push({
      title: '类型',
      valueType: 'text',
      dataIndex: 'type',
      hideInSearch: true,
    });
  }

  // 公共字段
  columns.push(
    {
      title: '创建时间',
      dataIndex: ['metadata', 'creationTimestamp'],
      valueType: 'dateTime',
      hideInSearch: true,
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
  );

  // 渲染页
  return (
    <ProTable<Config, Config>
      actionRef={ref}
      columns={columns}
      toolbar={{
        menu: {
          type: 'tab',
          activeKey,
          items: [
            {
              key: 'config-map',
              label: <span>配置字典</span>,
            },
            {
              key: 'secret',
              label: <span>保密字典</span>,
            },
          ],
          onChange: (key) => {
            if (!key) return;
            setActiveKey(key);
            ref.current?.reload();
          },
        },
      }}
      pagination={{
        pageSize: 10,
      }}
      search={{
        filterType: 'light',
      }}
      options={{
        search: {
          placeholder: '名称',
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
        let data: Config[] = [];
        switch (activeKey) {
          case 'config-map': {
            data = await listNamespacedConfigMap(namespace);
            break;
          }
          case 'secret': {
            data = await listNamespacedSecret(namespace);
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
