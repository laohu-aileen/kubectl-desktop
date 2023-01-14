import {
  namespacedConfigMap,
  namespacedSecret,
  namespaceLabels,
} from '@/services';
import { PlusOutlined } from '@ant-design/icons';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { V1ConfigMap, V1Secret } from '@kubernetes/client-node';
import { Button, message, Popconfirm } from 'antd';
import React, { useRef, useState } from 'react';
import { v1 as uuid } from 'uuid';
import { ColumnActionTool } from '../basic';
import { ConfigEditor } from './editor';
type Config = V1ConfigMap | V1Secret;

export const ConfigTable = () => {
  const ref = useRef<ActionType>();
  const [activeKey, setActiveKey] = useState<React.Key>('configMap');
  const [ns, setNs] = useState<string>('default');
  const secretMode: boolean = activeKey === 'secret';

  // 公共字段
  const columns: ProColumns<Config>[] = [
    {
      title: '名称',
      valueType: 'text',
      dataIndex: ['metadata', 'name'],
      hideInSearch: true,
    },
    {
      title: '禁用更新',
      dataIndex: 'immutable',
      valueType: 'switch',
      hideInSearch: true,
    },
    {
      title: '命名空间',
      dataIndex: ['metadata', 'namespace'],
      valueType: 'select',
      request: namespaceLabels,
      initialValue: ns,
      hideInTable: true,
      fieldProps: { allowClear: false },
    },
  ];

  // 保密字典专有名词
  if (secretMode) {
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
      width: 200,
    },
    {
      title: '操作',
      valueType: 'option',
      hideInSearch: true,
      align: 'right',
      width: 200,
      render: (_, { metadata }) => (
        <ColumnActionTool
          actions={[
            <ConfigEditor
              key="edit"
              name={metadata?.name}
              namespace={metadata?.namespace || ns}
              title="编辑配置"
              secret={secretMode}
              trigger={<a>编辑</a>}
              afterSubmit={() => {
                ref.current?.reload();
                message.success('保存成功');
                return true;
              }}
            />,
            <Popconfirm
              key="remove"
              title="警告"
              description="改操作不可撤销,你确定执行操作?"
              onConfirm={async () => {
                if (!metadata?.name) return;
                if (!metadata?.namespace) return;
                const { name, namespace } = metadata;
                if (secretMode) {
                  await namespacedSecret(namespace).delete(name);
                } else {
                  await namespacedConfigMap(namespace).delete(name);
                }
                ref.current?.reload();
                message.success('操作成功');
              }}
            >
              <a>删除</a>
            </Popconfirm>,
          ]}
        />
      ),
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
              key: 'configMap',
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
        actions: [
          <ConfigEditor
            key="edit"
            title="新增配置"
            namespace={ns}
            secret={secretMode}
            trigger={
              <Button type="primary">
                <PlusOutlined />
                创建
              </Button>
            }
            afterSubmit={() => {
              ref.current?.reload();
              message.success('保存成功');
              return true;
            }}
          />,
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
          placeholder: '名称',
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
        if (namespace !== ns) setNs(namespace);
        let data: Config[] = [];
        switch (activeKey) {
          case 'configMap': {
            data = await namespacedConfigMap(namespace).list();
            break;
          }
          case 'secret': {
            data = await namespacedSecret(namespace).list();
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
