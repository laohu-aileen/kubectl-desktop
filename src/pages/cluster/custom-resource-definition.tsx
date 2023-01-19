import { ProTable } from '@/components/table';
import {
  V1CustomResourceDefinition,
  V1CustomResourceDefinitionVersion,
} from '@kubernetes/client-node';
import { customResourceDefinition } from '@/services';

export default () => (
  <ProTable<V1CustomResourceDefinition>
    api={customResourceDefinition}
    headerTitle="扩展"
    search={false}
    pagination={false}
    columns={[
      {
        title: '名称',
        valueType: 'text',
        dataIndex: ['metadata', 'name'],
      },
      {
        title: '组',
        valueType: 'text',
        dataIndex: ['spec', 'group'],
      },
      {
        title: '版本',
        dataIndex: ['spec', 'versions'],
        valueType: 'tags',
        renderText: (value: V1CustomResourceDefinitionVersion[]) => {
          if (typeof value === 'string') return value;
          return value.map(({ name }) => name);
        },
      },
      {
        title: '作用域',
        valueType: 'text',
        dataIndex: ['spec', 'scope'],
      },
      {
        title: '创建时间',
        dataIndex: ['metadata', 'creationTimestamp'],
        valueType: 'dateTime',
        width: 200,
      },
    ]}
  />
);
