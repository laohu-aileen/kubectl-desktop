import { namespaceRestful } from '@/services/namespaces';
import { ProFormSelect, LightFilter } from '@ant-design/pro-components';

export const NamespaceFilterSelect = () => (
  <LightFilter>
    <ProFormSelect
      initialValue="default"
      name="namespace"
      label="命名空间"
      request={async () => {
        const data = await namespaceRestful.getAll();
        return data.map((item) => ({
          label: item.name,
          value: item.name,
        }));
      }}
    />
  </LightFilter>
);
