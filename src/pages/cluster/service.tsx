import {
  ProFormDependency,
  ProFormSelect,
  ProColumns,
} from '@ant-design/pro-components';
import { ProTable } from '@/components/table';
import { V1Service, V1ServicePort } from '@kubernetes/client-node';
import { WorkloadSelectModal } from '@/components/popup';
import { ProFormEditorTable, ProFormMap } from '@/components/input';
import { namespacedService } from '@/services';
import { Divider, Space } from 'antd';
import lodash from 'lodash';
import { ValueType } from '@/value-types';
import { ReactNode } from 'react';

/**
 * 表格列配置
 */
const tableColumns: ProColumns<V1Service, ValueType>[] = [
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
    renderText: (value: V1ServicePort[]) =>
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
];

// 规格列配置
const specColumns: ReactNode[] = [
  <ProFormSelect
    key="type"
    required
    name={['spec', 'type']}
    label="类型"
    options={[
      {
        label: '负载均衡',
        value: 'LoadBalancer',
      },
      {
        label: '虚拟集群IP',
        value: 'ClusterIP',
      },
    ]}
  />,
  <ProFormDependency key="selector" name={[['metadata', 'namespace']]}>
    {({ metadata }: V1Service, form) => (
      <ProFormMap
        required
        key="selector"
        name={['spec', 'selector']}
        label={
          <Space>
            <span>选择器</span>
            <Divider type="vertical" />
            <WorkloadSelectModal
              namespace={metadata?.namespace || 'default'}
              onSelect={({ spec }: any) => {
                if (!spec) return;
                const template = lodash.has(spec, 'jobTemplate')
                  ? spec?.jobTemplate.spec?.template
                  : spec?.template;
                return form.setFieldValue(
                  ['spec', 'selector'],
                  template.metadata?.labels,
                );
              }}
            />
          </Space>
        }
      />
    )}
  </ProFormDependency>,
  <ProFormDependency key="ports" name={[['spec', 'type']]}>
    {({ spec }) => {
      const columns: ProColumns<V1ServicePort, ValueType>[] = [
        {
          title: '名称',
          dataIndex: 'name',
          valueType: 'text',
        },
        {
          title: '协议',
          dataIndex: 'protocol',
          valueType: 'select',
          valueEnum: {
            TCP: { text: 'TCP' },
            UDP: { text: 'UDP' },
          },
        },
        {
          title: '服务端口',
          dataIndex: 'port',
          valueType: 'digit',
          fieldProps: { style: { width: '100%' } },
        },
        {
          title: '容器端口',
          dataIndex: 'targetPort',
          valueType: 'digit',
          fieldProps: { style: { width: '100%' } },
        },
      ];

      if (spec?.type === 'LoadBalancer') {
        columns.push({
          title: '节点端口',
          dataIndex: 'nodePort',
          valueType: 'digit',
          fieldProps: { style: { width: '100%' } },
        });
      }

      return (
        <ProFormEditorTable<V1ServicePort>
          key="ports"
          name={['spec', 'ports']}
          required
          label="端口"
          columns={columns}
        />
      );
    }}
  </ProFormDependency>,
];

// 页面渲染
export default () => (
  <ProTable<V1Service>
    api={namespacedService}
    headerTitle="服务"
    pagination={false}
    columns={tableColumns}
    formProps={{
      columns: [
        {
          title: '规格',
          items: specColumns,
        },
      ],
    }}
  />
);
