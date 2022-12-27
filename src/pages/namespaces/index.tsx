import {
  PageContainer,
  ProTable,
  ProColumns,
} from '@ant-design/pro-components';
import { namespaceRestful, Namespace } from '@/services/namespaces';
import { Badge, Tag } from 'antd';

export default () => {
  const columns: ProColumns<Namespace>[] = [
    {
      title: '名称',
      dataIndex: 'name',
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
      render: (value) => <Badge status="success" text={value} />,
    },
    {
      title: '创建时间',
      dataIndex: 'creationTimestamp',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      valueType: 'option',
      render: () => [
        <a key="edit" type="primary">
          编辑
        </a>,
        <a key="remove" type="primary">
          删除
        </a>,
      ],
    },
  ];

  return (
    <PageContainer ghost>
      <ProTable<Namespace>
        rowKey="uid"
        search={false}
        columns={columns}
        pagination={false}
        request={async () => {
          const data = await namespaceRestful.getAll();
          return { data, success: true };
        }}
      />
    </PageContainer>
  );
};
