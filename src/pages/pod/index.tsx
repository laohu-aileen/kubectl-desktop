import { ProTable } from '@/components/table';
import { V1Pod } from '@kubernetes/client-node';
import { namespacedPod } from '@/services';
import { columns } from './columns';

export default () => (
  <ProTable<V1Pod>
    api={namespacedPod}
    headerTitle="容器"
    pagination={false}
    columns={columns}
    action={{
      create: false,
      update: false,
      delete: true,
    }}
  />
);
