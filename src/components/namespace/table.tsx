import { ProTable, ProColumns, ActionType } from '@ant-design/pro-components';
import { Button, message, Popconfirm } from 'antd';
import { NamespaceModalForm } from './editor';
import { useRef } from 'react';
import style from './style.less';
import { V1Namespace } from '@kubernetes/client-node';
import { deleteNamespace, listNamespace } from '@/services';
import { TagColumn, ColumnActionTool } from '../basic';
import { v1 as uuid } from 'uuid';

export const NamespaceTable = () => {
  const ref = useRef<ActionType>();
  const columns: ProColumns<V1Namespace>[] = [
    {
      title: '名称',
      valueType: 'text',
      dataIndex: ['metadata', 'name'],
      width: 300,
    },
    {
      title: '标签',
      dataIndex: ['metadata', 'labels'],
      render: (value: any) => <TagColumn value={value} />,
    },
    {
      title: '状态',
      dataIndex: ['status', 'phase'],
      width: 180,
      valueEnum: {
        Active: {
          text: '运行中',
          status: 'Success',
        },
        Terminating: {
          text: '停止中',
          status: 'Warning',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: ['metadata', 'creationTimestamp'],
      valueType: 'dateTime',
      width: 200,
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'right',
      width: 200,
      render: (_, record) => (
        <ColumnActionTool
          actions={[
            <NamespaceModalForm
              title="编辑命名空间"
              key="edit"
              trigger={
                <Button
                  className={style.actionBtn}
                  disabled={record.status?.phase !== 'Active'}
                  type="link"
                >
                  编辑
                </Button>
              }
              name={record.metadata?.name}
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
                if (!record.metadata?.name) {
                  ref.current?.reload();
                  return;
                }
                await deleteNamespace(record.metadata.name);
                message.success('提交成功');
                ref.current?.reload();
              }}
            >
              <Button
                className={style.actionBtn}
                disabled={record.status?.phase !== 'Active'}
                type="link"
              >
                删除
              </Button>
            </Popconfirm>,
          ]}
        />
      ),
    },
  ];

  return (
    <ProTable<V1Namespace>
      headerTitle="命名空间"
      actionRef={ref}
      search={false}
      columns={columns}
      pagination={false}
      polling={3000}
      toolbar={{
        actions: [
          <NamespaceModalForm
            title="创建命名空间"
            key="create"
            afterSubmit={() => {
              ref.current?.reload();
              message.success('保存成功');
              return true;
            }}
          />,
        ],
      }}
      rowKey={({ metadata }) => metadata?.uid || uuid()}
      request={async () => {
        const data = await listNamespace();
        for (const item of data) {
          if (!item.metadata?.labels) continue;
          delete item.metadata.labels['kubernetes.io/metadata.name'];
        }
        return { data, success: true };
      }}
    />
  );
};
