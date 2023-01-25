import { ProMenuTable } from '@/components/table';
import { V1ConfigMap, V1Secret } from '@kubernetes/client-node';
import { configMapProps } from './map';
import { secretProps } from './secret';

export default () => (
  <ProMenuTable<V1ConfigMap | V1Secret>
    menus={[configMapProps, secretProps]}
    prevColumns={[
      {
        title: '名称',
        valueType: 'text',
        dataIndex: ['metadata', 'name'],
      },
      {
        title: '禁用更新',
        dataIndex: 'immutable',
        valueType: 'switch',
      },
    ]}
    nextColumns={[
      {
        title: '创建时间',
        dataIndex: ['metadata', 'creationTimestamp'],
        valueType: 'dateTime',
        hideInSearch: true,
        width: 200,
      },
    ]}
  />
);
