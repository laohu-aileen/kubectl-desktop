import { ProFormMap } from '@/components/input';
import { PvSelectModal } from '@/components/popup/pv-select-modal';
import { ProTable } from '@/components/table';
import { namespacedPersistentVolumeClaim, storageClass } from '@/services';
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
import type { V1PersistentVolumeClaim } from '@kubernetes/client-node';
import { Divider, Radio, Space } from 'antd';
import type { ReactNode } from 'react';

// 表格列项
const tableColumns: ProColumns<V1PersistentVolumeClaim, ValueType>[] = [
  {
    title: '名称',
    valueType: 'text',
    dataIndex: ['metadata', 'name'],
  },
  {
    title: '总量',
    valueType: 'text',
    dataIndex: ['spec', 'resources', 'requests', 'storage'],
  },
  {
    title: '访问模式',
    valueType: 'tags',
    dataIndex: ['spec', 'accessModes'],
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
    title: '关联存储卷',
    valueType: 'text',
    dataIndex: ['spec', 'volumeName'],
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
  <ProFormGroup key="volume-mode-storage">
    <ProFormText
      required
      width="lg"
      label="容量"
      name={['spec', 'resources', 'requests', 'storage']}
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
  <ProFormCheckbox.Group
    key="access-modes"
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
  />,
  <ProFormDependency<V1PersistentVolumeClaim>
    key="ext"
    name={[
      ['spec', 'storageClassName'],
      ['spec', 'selector', 'matchLabels'],
    ]}
  >
    {({ spec }, form) => {
      const storageClassName = ['spec', 'storageClassName'];
      const matchLabels = ['spec', 'selector', 'matchLabels'];
      const automatic = !spec?.selector?.matchLabels;
      const drivder: ReactNode = (
        <Divider key="divider" plain>
          <Radio.Group
            value={automatic}
            size="small"
            onChange={({ target }) => {
              if (target.value) {
                form.setFieldValue(matchLabels, undefined);
              } else {
                form.setFieldValue(storageClassName, undefined);
                form.setFieldValue(matchLabels, {});
              }
            }}
          >
            <Radio.Button value={true}>动态分配</Radio.Button>
            <Radio.Button value={false}>静态分配</Radio.Button>
          </Radio.Group>
        </Divider>
      );
      if (automatic) {
        return [
          drivder,
          <ProFormSelect
            required
            label="类型"
            key="storageClassName"
            name={storageClassName}
            request={async () => {
              const data = await storageClass.list();
              return data.map(({ metadata }) => ({
                label: metadata?.name,
                value: metadata?.name,
              }));
            }}
          />,
        ];
      } else {
        return [
          drivder,
          <ProFormMap
            required
            key="selector"
            name={matchLabels}
            label={
              <Space>
                <span>选择器</span>
                <Divider type="vertical" />
                <PvSelectModal
                  onSelect={({ metadata }: any) => {
                    if (!metadata) return;
                    return form.setFieldValue(
                      matchLabels,
                      metadata?.labels || {},
                    );
                  }}
                />
              </Space>
            }
          />,
        ];
      }
    }}
  </ProFormDependency>,
];

// 渲染组件
export default () => (
  <ProTable<V1PersistentVolumeClaim>
    api={namespacedPersistentVolumeClaim}
    headerTitle="存储声明"
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
