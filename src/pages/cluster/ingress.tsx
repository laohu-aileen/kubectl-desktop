import {
  ProColumns,
  ProFormDependency,
  ProFormList,
  ProFormText,
} from '@ant-design/pro-components';
import { ProTable } from '@/components/table';
import {
  V1HTTPIngressPath,
  V1Ingress,
  V1IngressRule,
  V1LoadBalancerIngress,
} from '@kubernetes/client-node';
import { namespacedIngress, namespacedService } from '@/services';
import { ValueType } from '@/value-types';
import { ReactNode } from 'react';
import { ProFormEditorTable } from '@/components/input';
import { ActionBox } from '@/components/container';
import { CloseOutlined } from '@ant-design/icons';

// 表格属性
const tableColumns: ProColumns<V1Ingress, ValueType>[] = [
  {
    title: '名称',
    valueType: 'text',
    dataIndex: ['metadata', 'name'],
  },
  {
    title: '端点',
    valueType: 'tags',
    dataIndex: ['status', 'loadBalancer', 'ingress'],
    renderText: (value: V1LoadBalancerIngress[]) => value.map(({ ip }) => ip),
  },
  {
    title: '类型',
    valueType: 'text',
    dataIndex: ['spec', 'ingressClassName'],
  },
  {
    title: '规则',
    valueType: 'tags',
    dataIndex: ['spec', 'rules'],
    renderText: (value: V1IngressRule[]) => [
      ...value.map(({ host, http }) => {
        if (!http?.paths) return [];
        return http.paths.map(
          ({ path, backend }) => `${host}${path} -> ${backend.service?.name}`,
        );
      }),
    ],
  },
  {
    title: '创建时间',
    dataIndex: ['metadata', 'creationTimestamp'],
    valueType: 'dateTime',
    width: 200,
  },
];

// 规则列配置
const ruleColumns: ReactNode[] = [
  <ProFormDependency key="rules" name={[['metadata', 'namespace']]}>
    {({ metadata }: V1Ingress) => (
      <ProFormList
        required
        name={['spec', 'rules']}
        copyIconProps={false}
        creatorButtonProps={{
          position: 'top',
          creatorButtonText: '新增一条规则',
        }}
        deleteIconProps={{
          Icon: CloseOutlined,
          tooltipText: '移除这条规则',
        }}
        itemRender={({ listDom, action }) => (
          <ActionBox action={action}>{listDom}</ActionBox>
        )}
      >
        <ProFormText required name="host" label="域名" />
        <ProFormEditorTable<V1HTTPIngressPath>
          name={['http', 'paths']}
          required
          label="规则"
          columns={[
            {
              title: '类型',
              dataIndex: 'pathType',
              valueType: 'text',
              valueEnum: {
                Prefix: { text: '前缀' },
                Exact: { text: '完全匹配' },
                Mixed: { text: '混合' },
              },
            },
            {
              title: '路径',
              dataIndex: 'path',
              valueType: 'text',
            },
            {
              title: '服务',
              dataIndex: ['backend', 'service', 'name'],
              valueType: 'select',
              params: { namespace: metadata?.namespace },
              request: async ({ namespace }) => {
                if (!namespace) return [];
                const rest = namespacedService(namespace);
                const data = await rest.list();
                return data.map((item) => ({
                  label: item.metadata?.name,
                  value: item.metadata?.name,
                }));
              },
            },
            {
              title: '端口',
              dataIndex: ['backend', 'service', 'port', 'number'],
              valueType: 'digit',
            },
          ]}
        />
      </ProFormList>
    )}
  </ProFormDependency>,
];

// 渲染组件
export default () => (
  <ProTable<V1Ingress>
    api={namespacedIngress}
    headerTitle="路由"
    pagination={false}
    columns={tableColumns}
    formProps={{
      columns: [
        {
          title: '规则',
          items: ruleColumns,
        },
      ],
    }}
  />
);
