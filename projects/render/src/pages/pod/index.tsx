import { ProTable } from '@/components/table';
import { namespacedPod } from '@/services';
import type { V1Pod } from '@kubernetes/client-node';
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
      remove: true,
    }}
  />
);
