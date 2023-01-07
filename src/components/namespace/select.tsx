import { listNamespaceLabels } from '@/services/namespaces';
import {
  ProFormSelect,
  LightFilter,
  LightFilterProps,
} from '@ant-design/pro-components';

export const NamespaceLightFilterSelect = (props: LightFilterProps<any>) => {
  console.log({ props });
  return (
    <LightFilter {...props}>
      <ProFormSelect
        name="namespace"
        label="命名空间"
        request={listNamespaceLabels}
      />
    </LightFilter>
  );
};
