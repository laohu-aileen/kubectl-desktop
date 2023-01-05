import { ProTable, ProColumns, ActionType } from '@ant-design/pro-components';
import { namespaceRestful, Namespace } from '@/services/namespaces';
import { Badge, Button, message, Popconfirm, Tag } from 'antd';
import Editor from './editor';
import { useRef } from 'react';
import style from './style.less';

export default () => {
  const ref = useRef<ActionType>();
  const columns: ProColumns<Namespace>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      width: 300,
    },
    {
      title: '标签',
      dataIndex: 'labels',
      render: (value: any) => {
        const labels = [];
        for (const key in value) {
          if (!value.hasOwnProperty(key)) continue;
          if (labels.length) labels.push(<br key={`${key}-br`} />);
          const item = key + ':' + value[key];
          labels.push(
            <Tag key={key} color="blue">
              {item}
            </Tag>,
          );
        }
        return labels;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 180,
      render: (value) => <Badge status="success" text={value} />,
    },
    {
      title: '创建时间',
      dataIndex: 'creationTimestamp',
      valueType: 'dateTime',
      width: 200,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (_, record) => [
        <Editor
          title="编辑命名空间"
          key="edit"
          trigger={
            <Button
              className={style.actionBtn}
              disabled={record.status !== 'Active'}
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
            await namespaceRestful.delete(record.name);
            message.success('提交成功');
            ref.current?.reload();
          }}
        >
          <Button
            className={style.actionBtn}
            disabled={record.status !== 'Active'}
            type="link"
          >
            删除
          </Button>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <ProTable<Namespace>
      rowKey="uid"
      headerTitle="命名空间"
      actionRef={ref}
      search={false}
      columns={columns}
      pagination={false}
      polling={3000}
      toolbar={{
        actions: [
          <Editor
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
      request={async () => {
        const data = await namespaceRestful.getAll();
        return { data, success: true };
      }}
    />
  );
};
