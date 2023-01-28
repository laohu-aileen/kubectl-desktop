import type { DrawerFromProps } from '@/components/form';
import { DrawerFrom } from '@/components/form';
import { namespace } from '@/services';
import type { RESTFul } from '@/utils/restful';
import type { ValueType } from '@/value-types';
import { PlusOutlined } from '@ant-design/icons';
import type {
  ActionType,
  ProColumns,
  ProTableProps as TableProps,
} from '@ant-design/pro-components';
import { ProTable as Table } from '@ant-design/pro-components';
import type { ListToolBarMenu } from '@ant-design/pro-table/es/components/ListToolBar';
import { Button, message, Popconfirm } from 'antd';
import lodash from 'lodash';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { v1 as uuid } from 'uuid';
import type { BasicTableData } from './definition';

/**
 * 资源数据表格参数
 */
export interface ProTableProps<T> extends TableProps<T, T, ValueType> {
  api?: RESTFul<T> | ((namespace: string) => RESTFul<T>);
  itemActionsRender?: (record: T, actions: ReactNode[]) => ReactNode[];
  formProps?: DrawerFromProps<T>;
  action?: {
    create?: boolean;
    update?: boolean;
    remove?: boolean;
  };
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
  action,
  itemActionsRender,
  ...props
}: ProTableProps<T>) => {
  const actionRef = useRef<ActionType>();
  const [activeNamespace, setActiveNamespace] = useState<string>('default');
  const formAction = {
    create: !!formProps,
    update: !!formProps,
    remove: !!formProps,
  };
  if (action) {
    Object.assign(formAction, action);
  }

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
        if (!rest?.list) return { success: false };
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
      initialValue: 'default',
      hideInTable: true,
      fieldProps: { allowClear: false },
      request: async () => {
        if (!namespace.list) return [];
        const data = await namespace.list();
        return data.map((item) => ({
          label: item.metadata?.name,
          value: item.metadata?.name,
        }));
      },
    });
  }

  // 渲染操作栏
  if (formAction.create) {
    const initialValues = lodash.merge(
      lodash.cloneDeep(formProps?.initialValues || {}),
      { metadata: { namespace: activeNamespace } } as T,
    );

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
        initialValues={initialValues}
        onFinish={async () => {
          message.success('保存成功');
          actionRef.current?.reload();
          return true;
        }}
      />,
    );
  }

  // 渲染数据记录操作
  if (itemActionsRender || formAction.update || formAction.remove) {
    tableProps.columns?.push({
      title: '操作',
      valueType: 'option',
      align: 'right',
      render: (_, record) => {
        const actions: ReactNode[] = [];
        if (formAction.update) {
          actions.push(
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
            />,
          );
        }
        if (formAction.remove) {
          actions.push(
            <Popconfirm
              key="remove"
              title="警告"
              description="改操作不可撤销,你确定执行操作?"
              onConfirm={async () => {
                if (!rest?.remove) return;
                if (!record.metadata?.name) {
                  actionRef.current?.reload();
                  return;
                }
                await rest.remove(record.metadata.name);
                message.success('执行成功');
                actionRef.current?.reload();
              }}
            >
              <Button type="link">删除</Button>
            </Popconfirm>,
          );
        }
        return (
          <div style={{ textAlign: 'right' }}>
            {itemActionsRender ? itemActionsRender(record, actions) : actions}
          </div>
        );
      },
    });
  }

  // 渲染表格组件
  return <Table<T, T, ValueType> actionRef={actionRef} {...tableProps} />;
};

/**
 * 子表格输入参数
 */
export interface ProMenuTableItem<T> extends ProTableProps<T> {
  key?: React.Key;
}

/**
 * 菜单化表格参数
 */
export interface ProMenuTableProps<T> {
  /**
   * 子菜单表格参数
   */
  menus: ProMenuTableItem<T>[];
  /**
   * 子菜单表格公共参数
   */
  commonMenuProps?: ProMenuTableItem<T>;
  /**
   * 公共前置字段
   */
  prevColumns?: ProColumns<T, ValueType>[];
  /**
   * 公共后置字段
   */
  nextColumns?: ProColumns<T, ValueType>[];
}

/**
 * 菜单化表格
 */
export const ProMenuTable = <T extends BasicTableData>({
  menus,
  commonMenuProps,
  prevColumns,
  nextColumns,
}: ProMenuTableProps<T>) => {
  const [activeKey, setActiveKey] = useState<React.Key>();

  // 定义表格参数
  const tableProps: ProTableProps<T> = commonMenuProps
    ? lodash.cloneDeep(commonMenuProps)
    : {};

  // 操作菜单参数
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
      key: key || uuid(),
      label: headerTitle,
    });
    if (key === toolbarMenu.activeKey) {
      lodash.merge(tableProps, props);
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
