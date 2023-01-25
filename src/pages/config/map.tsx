import { ProFormMap } from '@/components/input';
import { ProMenuTableItem } from '@/components/table';
import { namespacedConfigMap } from '@/services';
import { ProFormRadio } from '@ant-design/pro-components';
import { V1ConfigMap } from '@kubernetes/client-node';

export const configMapProps: ProMenuTableItem<V1ConfigMap> = {
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
          <ProFormMap required key="data" name={['data']} label={'数据'} />,
        ],
      },
    ],
  },
};
