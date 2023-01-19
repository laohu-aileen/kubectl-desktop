import { ProTable } from '@/components/table';
import { V1Service, V1ServicePort } from '@kubernetes/client-node';
import { namespacedService } from '@/services';

export default () => (
  <ProTable<V1Service>
    api={namespacedService}
    headerTitle="服务"
    pagination={false}
    columns={[
      {
        title: '名称',
        valueType: 'text',
        dataIndex: ['metadata', 'name'],
      },
      {
        title: '类型',
        valueType: 'text',
        dataIndex: ['spec', 'type'],
      },
      {
        title: 'IP',
        valueType: 'text',
        dataIndex: ['spec', 'clusterIP'],
      },
      {
        title: '端口',
        dataIndex: ['spec', 'ports'],
        valueType: 'tags',
        renderText: (value: V1ServicePort[] & any) =>
          value.map((item: V1ServicePort) => {
            let value = `${item.targetPort}`;
            if (item.nodePort) value += `:${item.nodePort}`;
            return `${value}/${item.protocol}`;
          }),
      },
      {
        title: '选择器',
        dataIndex: ['spec', 'selector'],
        valueType: 'tags',
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
