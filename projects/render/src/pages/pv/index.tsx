import { ProTable } from '@/components/table';
import { persistentVolume, storageClass } from '@/services';
import type { ValueType } from '@/value-types';
import type { ProColumns } from '@ant-design/pro-components';
import {
  ProFormCheckbox,
  ProFormDependency,
  ProFormGroup,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import type { V1PersistentVolume } from '@kubernetes/client-node';
import { Divider } from 'antd';
import type { ReactNode } from 'react';

// 表格列项
const tableColumns: ProColumns<V1PersistentVolume, ValueType>[] = [
  {
    title: '名称',
    valueType: 'text',
    dataIndex: ['metadata', 'name'],
  },
  {
    title: '总量',
    valueType: 'text',
    dataIndex: ['spec', 'capacity', 'storage'],
  },
  {
    title: '访问模式',
    valueType: 'tags',
    dataIndex: ['spec', 'accessModes'],
  },
  {
    title: '回收策略',
    dataIndex: ['spec', 'persistentVolumeReclaimPolicy'],
    valueEnum: {
      Retain: { text: '保留' },
      Delete: { text: '删除' },
      Recycle: { text: '回收' },
    },
  },
  {
    title: '状态',
    dataIndex: ['status', 'phase'],
    valueEnum: {
      Available: { text: '可用', status: 'Success' },
      Bound: { text: '绑定', status: 'Success' },
      Released: { text: '释放', status: 'Warning' },
      Failed: { text: '失败', status: 'Error' },
    },
  },
  {
    title: '存储类型',
    valueType: 'text',
    dataIndex: ['spec', 'storageClassName'],
  },
  {
    title: '绑定存储申明',
    valueType: 'text',
    dataIndex: ['spec', 'claimRef', 'name'],
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
    required
    label="类型"
    key="storageClassName"
    name={['spec', 'storageClassName']}
    request={async () => {
      const data = await storageClass.list();
      return data.map(({ metadata }) => ({
        label: metadata?.name,
        value: metadata?.name,
      }));
    }}
  />,
  <ProFormGroup key="volume-mode-storage">
    <ProFormText
      required
      width="lg"
      label="容量"
      name={['spec', 'capacity', 'storage']}
    />
    <ProFormRadio.Group
      required
      name={['spec', 'volumeMode']}
      label="挂载模式"
      options={[
        {
          label: '文件系统',
          value: 'Filesystem',
        },
        {
          label: '块设备',
          value: 'Block',
        },
      ]}
    />
  </ProFormGroup>,
  <ProFormGroup key="access-modes">
    <ProFormCheckbox.Group
      required
      width="lg"
      name={['spec', 'accessModes']}
      label="访问模式"
      options={[
        {
          label: '单节点读写',
          value: 'ReadWriteOnce',
        },
        {
          label: '多节点只读',
          value: 'ReadOnlyMany',
        },
        {
          label: '多节点读写',
          value: 'ReadWriteMany',
        },
        {
          label: '单Pod读写',
          value: 'ReadWriteOncePod',
        },
      ]}
    />
    <ProFormRadio.Group
      required
      name={['spec', 'persistentVolumeReclaimPolicy']}
      label="回收策略"
      options={[
        {
          label: '保留',
          value: 'Retain',
        },
        {
          label: '回收空间',
          value: 'Recycle',
        },
        {
          label: '删除',
          value: 'Delete',
        },
      ]}
    />
  </ProFormGroup>,
  <ProFormDependency key="ext" name={[['spec', 'storageClassName']]}>
    {({ spec }: V1PersistentVolume) => {
      switch (spec?.storageClassName) {
        case 'local-path':
          return [
            <Divider key="drivider" />,
            <ProFormText
              key="path"
              required
              label="存储路径"
              name={['spec', 'hostPath', 'path']}
            />,
            <ProFormSelect
              key="type"
              required
              width="md"
              label="路径类型"
              name={['spec', 'hostPath', 'type']}
              options={[
                {
                  label: '目录或自动创建',
                  value: 'DirectoryOrCreate',
                },
                {
                  label: '目录',
                  value: 'Directory',
                },
                {
                  label: '文件',
                  value: 'File',
                },
                {
                  label: 'UNIX套接字',
                  value: 'Socket',
                },
                {
                  label: '字符设备',
                  value: 'CharDevice',
                },
                {
                  label: '块设备',
                  value: 'BlockDevice',
                },
              ]}
            />,
          ];
      }
    }}
  </ProFormDependency>,
];

// 渲染组件
export default () => (
  <ProTable<V1PersistentVolume>
    api={persistentVolume}
    headerTitle="存储卷"
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
