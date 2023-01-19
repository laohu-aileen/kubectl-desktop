import { MapInput } from '@/components/input';
import { ProMenuTable } from '@/components/table';
import { namespacedConfigMap, namespacedSecret } from '@/services';
import {
  ProForm,
  ProFormRadio,
  ProFormSelect,
} from '@ant-design/pro-components';
import { V1ConfigMap, V1Secret } from '@kubernetes/client-node';

const SystemSecretType: string[] = [
  'Opaque',
  'kubernetes.io/service-account-token',
  'kubernetes.io/dockercfg',
  'kubernetes.io/dockerconfigjson',
  'kubernetes.io/basic-auth',
  'kubernetes.io/ssh-auth',
  'kubernetes.io/tls',
  'bootstrap.kubernetes.io/token',
];

export default () => (
  <ProMenuTable<V1ConfigMap | V1Secret>
    menus={[
      {
        key: 'config-map',
        headerTitle: '配置字典',
        api: namespacedConfigMap,
        formProps: {
          initialValues: {
            immutable: false,
          },
          columns: [
            {
              title: '配置值',
              items: [
                <ProFormRadio.Group
                  key="immutable"
                  name="immutable"
                  required
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
                />,
                <ProForm.Item required key="data" name="data" label="数据">
                  <MapInput />
                </ProForm.Item>,
              ],
            },
          ],
        },
      },
      {
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
                <ProForm.Item
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
                >
                  <MapInput />
                </ProForm.Item>,
              ],
            },
          ],
        },
      },
    ]}
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
