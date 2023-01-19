import {
  ProTable,
  ProColumns,
  ActionType,
  ProFormColumnsType,
  ProTableProps,
  BetaSchemaForm,
} from '@ant-design/pro-components';
import { ReactNode, useRef } from 'react';
import { v1 as uuid } from 'uuid';
import { RESTFul } from '@/utils/restful';
import { ColumnActionTool } from '../basic';
import { ValueType } from '../../value-types';
import { FormRef, KuberneteResourceBasic } from './definition';

/**
 * 集群资源参数
 */
export interface CluserResourceTableProps<T> {
  api: RESTFul<T>;
  headerTitle?: string;
  tableColumns?: ProColumns<T, ValueType>[];
  formColumns?: ProFormColumnsType<T, ValueType>[];
  actions?: (record: T, action: FormRef) => ReactNode[];
  tools?: (ref: FormRef) => ReactNode[];
}

/**
 * 集群资源表格
 *
 * @returns
 */
export const CluserResourceTable = <T extends KuberneteResourceBasic>({
  api,
  headerTitle,
  tableColumns,
  formColumns,
  actions,
  tools,
}: CluserResourceTableProps<T>) => {
  const actionRef = useRef<ActionType>();
  const tableProps: ProTableProps<T, T, ValueType> = {
    rowKey: ({ metadata }) => metadata?.uid || uuid(),
    headerTitle,
    actionRef,
    search: false,
    pagination: false,
    columns: [],
    // polling: 3000,
    toolbar: {},
    request: async () => {
      const data = await api.list();
      return { data, success: true };
    },
  };

  // 表格按钮
  if (tools && tableProps.toolbar) {
    tableProps.toolbar.actions = tools(actionRef);
  }

  // 表格列配置
  if (tableColumns) {
    tableProps.columns?.push(...tableColumns);
  }

  // 时间字段
  tableProps.columns?.push({
    title: '创建时间',
    dataIndex: ['metadata', 'creationTimestamp'],
    valueType: 'dateTime',
    width: 200,
  });

  // 操作项目
  if (actions || formColumns) {
    tableProps.columns?.push({
      title: '操作',
      valueType: 'option',
      align: 'right',
      render: (_, record) => {
        const btns: ReactNode[] = [];
        if (formColumns) {
          btns.push(
            <BetaSchemaForm<T, ValueType>
              key="update"
              layoutType="DrawerForm"
              trigger={<a>编辑</a>}
              columns={formColumns || []}
              initialValues={record}
            />,
          );
        }
        if (actions) {
          btns.push(actions(record, actionRef.current as any));
        }
        return <ColumnActionTool actions={btns} />;
      },
    });
  }

  // 渲染结果
  return <ProTable<T, T, ValueType> {...tableProps} />;
};
