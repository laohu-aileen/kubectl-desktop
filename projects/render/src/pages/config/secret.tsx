import { ProFormMap } from '@/components/input';
import type { ProMenuTableItem } from '@/components/table';
import { namespacedSecret } from '@/services';
import {
  ProForm,
  ProFormRadio,
  ProFormSelect,
} from '@ant-design/pro-components';
import type { V1Secret } from '@kubernetes/client-node';
import { SystemSecretType } from './type';

export const secretProps: ProMenuTableItem<V1Secret> = {
  key: 'secret',
  headerTitle: '保密字典',
  api: namespacedSecret,
  columns: [
    {
      title: '类型',
      valueType: 'text',
      dataIndex: 'type',
    },
  ],
  formProps: {
    initialValues: {
      immutable: false,
      type: 'Opaque',
    },
    columns: [
      {
        title: '配置值',
        items: [
          <ProForm.Group key="type-immutable">
            <ProFormSelect
              name="type"
              label="类型"
              required
              width="lg"
              showSearch
              dependencies={['type']}
              request={async ({ type, keyWords }) => {
                const options = [...SystemSecretType];
                if (type && !SystemSecretType.includes(type)) {
                  options.unshift(type);
                }
                if (keyWords && !SystemSecretType.includes(keyWords)) {
                  options.unshift(keyWords);
                }
                return options.map((item) => ({
                  label: item,
                  value: item,
                }));
              }}
            />
            <ProFormRadio.Group
              required
              name="immutable"
              label="禁用更新"
              options={[
                {
                  label: '关闭',
                  value: false,
                },
                {
                  label: '打开',
                  value: true,
                },
              ]}
            />
          </ProForm.Group>,
          <ProFormMap
            required
            key="data"
            name="data"
            label="数据"
            convertValue={(item) => {
              if (!item) return {};
              const res: any = {};
              for (const key of Object.keys(item)) {
                const value = item[key];
                if (!value) res[key] = value;
                else res[key] = window.atob(value);
              }
              return res;
            }}
            transform={(item) => {
              if (!item) return {};
              const res: any = {};
              for (const key of Object.keys(item)) {
                const value = item[key];
                if (!value) res[key] = value;
                else res[key] = window.btoa(value);
              }
              return res;
            }}
          />,
        ],
      },
    ],
  },
};
