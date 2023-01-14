import {
  ProTable,
  ProColumns,
  ActionType,
  ProConfigProvider,
  ListToolBarProps,
} from '@ant-design/pro-components';
import { MutableRefObject, ReactNode, useRef } from 'react';
import { V1ObjectMeta } from '@kubernetes/client-node';
import { v1 as uuid } from 'uuid';
import { RESTFul } from '@/utils/restful';
import { ColumnActionTool } from '../basic';
import { ValueTypeExts, valueTypeMap } from './value-type';

/**
 * 表单引用
 */
type FormRef = MutableRefObject<ActionType | undefined>;

/**
 * 数据项接口
 */
export interface KuberneteResourceBasic {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
}

/**
 * 集群资源参数
 */
export interface CluserResourceTableProps<T> {
  api: RESTFul<T>;
  headerTitle?: string;
  columns?: ProColumns<T, ValueTypeExts>[];
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
  columns,
  actions,
  tools,
}: CluserResourceTableProps<T>) => {
  const ref = useRef<ActionType>();
  const tableToolbar: ListToolBarProps = {};

  // 表格按钮
  if (tools) {
    tableToolbar.actions = tools(ref);
  }

  // 表格列
  const tableColumns: ProColumns<T, ValueTypeExts>[] = [
    {
      title: '名称',
      valueType: 'text',
      dataIndex: ['metadata', 'name'],
    },
  ];

  // 附加列
  if (columns) {
    tableColumns.push(...columns);
  }

  // 时间字段
  tableColumns.push({
    title: '创建时间',
    dataIndex: ['metadata', 'creationTimestamp'],
    valueType: 'dateTime',
    width: 200,
  });

  // 操作项目
  if (actions) {
    tableColumns.push({
      title: '操作',
      valueType: 'option',
      align: 'right',
      render: (_, record) => {
        const btns = actions(record, ref.current as any);
        return <ColumnActionTool actions={btns} />;
      },
    });
  }

  // 渲染结果
  return (
    <ProConfigProvider valueTypeMap={valueTypeMap} hashed={false}>
      <ProTable<T, T, ValueTypeExts>
        rowKey={({ metadata }) => metadata?.uid || uuid()}
        headerTitle={headerTitle}
        actionRef={ref}
        search={false}
        columns={tableColumns}
        pagination={false}
        polling={3000}
        toolbar={tableToolbar}
        request={async () => {
          const data = await api.list();
          return { data, success: true };
        }}
      />
    </ProConfigProvider>
  );
};
