import { FullPage } from '@/components/container';
import { ProTable } from '@/components/table';
import { namespacedPod } from '@/services';
import type { V1Pod } from '@kubernetes/client-node';
import { columns } from './columns';

export default () => (
  <FullPage>
    <ProTable<V1Pod>
      api={namespacedPod}
      autoSize={true}
      headerTitle="容器"
      pagination={false}
      columns={columns}
      action={{
        create: false,
        update: false,
        remove: true,
      }}
    />
  </FullPage>
);
