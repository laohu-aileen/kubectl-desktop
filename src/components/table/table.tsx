import { RESTFul } from '@/utils/restful';
import { ValueType } from '@/value-types';
import {
  ProTable as Table,
  ProTableProps as TableProps,
  ActionType,
  ProColumns,
} from '@ant-design/pro-components';
import { ListToolBarMenu } from '@ant-design/pro-table/es/components/ListToolBar';
import { DrawerFrom, DrawerFromProps } from '@/components/form';
import { Button, message, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { namespaceLabels } from '@/services';
import { v1 as uuid } from 'uuid';
import { useRef, useState } from 'react';
import { BasicTableData } from './definition';
import lodash from 'lodash';
import { useEffect } from 'react';

/**
 * 资源数据表格参数
 */
export interface ProTableProps<T> extends TableProps<T, T, ValueType> {
  api?: RESTFul<T> | ((namespace: string) => RESTFul<T>);
  formProps?: DrawerFromProps<T>;
}

/**
 * 资源数据表格
 *
 * @param param
 * @returns
 */
export const ProTable = <T extends BasicTableData>({
  api,
  formProps,
  ...props
}: ProTableProps<T>) => {
  const actionRef = useRef<ActionType>();
  const [activeNamespace, setActiveNamespace] = useState<string>('default');

  // 参数改变重载
  useEffect(() => {
    actionRef.current?.reload();
  }, [api, activeNamespace]);

  // 关联资源获取
  const inNamespace = lodash.isFunction(api);
  const rest = inNamespace ? api(activeNamespace) : api;

  // 基础属性设置
  const tableProps = lodash.merge(
    {
      rowKey: ({ metadata }) => metadata?.uid || uuid(),
      columns: [],
      toolbar: {
        actions: [],
      },
      search: {
        filterType: 'light',
      },
      request: async (params) => {
        if (!inNamespace) {
          const data = await rest?.list();
          return { data, success: true };
        }
        if (params.metadata?.namespace !== activeNamespace) {
          setActiveNamespace(params.metadata?.namespace || 'default');
          return { success: false };
        } else {
          const data = await rest?.list();
          return { data, success: true };
        }
      },
    } as TableProps<T, T, ValueType>,
    lodash.cloneDeep(props),
  );

  // 默认搜索处理
  for (const item of tableProps.columns || []) {
    if (item.hideInSearch !== undefined) continue;
    item.hideInSearch = true;
  }

  // 带命名空间筛选
  if (inNamespace) {
    tableProps.columns?.push({
      title: '命名空间',
      dataIndex: ['metadata', 'namespace'],
      valueType: 'select',
      request: namespaceLabels,
      initialValue: 'default',
      hideInTable: true,
      fieldProps: { allowClear: false },
    });
  }

  // 表单元件
  if (formProps) {
    tableProps.toolbar?.actions?.push(
      <DrawerFrom<T>
        key="create"
        title={props.headerTitle}
        trigger={
          <Button type="primary">
            <PlusOutlined />
            创建
          </Button>
        }
        {...formProps}
        api={rest}
        onFinish={async () => {
          message.success('保存成功');
          actionRef.current?.reload();
          return true;
        }}
      />,
    );
    tableProps.columns?.push({
      title: '操作',
      valueType: 'option',
      align: 'right',
      render: (_, record) => (
        <div style={{ textAlign: 'right' }}>
          <DrawerFrom<T>
            title={props.headerTitle}
            trigger={<Button type="link">编辑</Button>}
            {...formProps}
            key="update"
            api={rest}
            initialValues={record}
            onFinish={async () => {
              message.success('保存成功');
              actionRef.current?.reload();
              return true;
            }}
          />
          <Popconfirm
            key="remove"
            title="警告"
            description="改操作不可撤销,你确定执行操作?"
            onConfirm={async () => {
              if (!record.metadata?.name) {
                actionRef.current?.reload();
                return;
              }
              await rest?.delete(record.metadata.name);
              message.success('执行成功');
              actionRef.current?.reload();
            }}
          >
            <Button type="link">删除</Button>
          </Popconfirm>
        </div>
      ),
    });
  }

  // 渲染表格组件
  return <Table<T, T, ValueType> actionRef={actionRef} {...tableProps} />;
};

/**
 * 子表格输入参数
 */
export interface ProMenuTableItem<T> extends ProTableProps<T> {
  key: React.Key;
}

/**
 * 菜单化表格参数
 */
export interface ProMenuTableProps<T> {
  menus: ProMenuTableItem<T>[];
  prevColumns?: ProColumns<T, ValueType>[];
  nextColumns?: ProColumns<T, ValueType>[];
}

/**
 * 菜单化表格
 */
export const ProMenuTable = <T extends BasicTableData>({
  menus,
  prevColumns,
  nextColumns,
}: ProMenuTableProps<T>) => {
  const [activeKey, setActiveKey] = useState<React.Key>();

  // 定义变量
  const tableProps: ProTableProps<T> = {};
  const toolbarMenu: ListToolBarMenu = {
    type: 'tab',
    activeKey,
    items: [],
    onChange: (key) => {
      if (!key) return;
      setActiveKey(key);
    },
  };

  // 选择TAB
  for (const { key, headerTitle, ...props } of menus) {
    if (!toolbarMenu.activeKey) {
      toolbarMenu.activeKey = key;
    }
    toolbarMenu.items?.push({
      key,
      label: headerTitle,
    });
    if (key === toolbarMenu.activeKey) {
      Object.assign(tableProps, props);
    }
  }

  // 公共列字段
  const columns = [
    ...(prevColumns || []),
    ...(tableProps.columns || []),
    ...(nextColumns || []),
  ];

  // 渲染表格
  if (!tableProps.toolbar) tableProps.toolbar = {};
  tableProps.toolbar.menu = toolbarMenu;
  return <ProTable<T> {...tableProps} columns={columns} />;
};
