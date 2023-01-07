import { ProTable, ProColumns, ActionType } from '@ant-design/pro-components';
import { Button, message, Popconfirm } from 'antd';
import { NamespaceModalForm } from './editor';
import { useRef } from 'react';
import style from './style.less';
import { V1Namespace } from '@kubernetes/client-node';
import { listNamespace } from '@/services';
import { TagColumn } from '../basic';
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
        Active: { text: '运行中', status: 'Success' },
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
      width: 200,
      render: (_, record) => [
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
          data={record}
          onFinish={() => {
            message.success('提交成功');
            ref.current?.reload();
            return true;
          }}
        />,
        <Popconfirm
          key="remove"
          title="删除命名空间"
          description="改操作不可撤销,你确定执行操作?"
          onConfirm={async () => {
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
      ],
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
            onFinish={() => {
              message.success('提交成功');
              ref.current?.reload();
              return true;
            }}
          />,
        ],
      }}
      rowKey={({ metadata }) => metadata?.uid || uuid()}
      request={async () => {
        const data = await listNamespace();
        return { data, success: true };
      }}
    />
  );
};
