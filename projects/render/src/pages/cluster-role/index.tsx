import { FullPage } from '@/components/container';
import { ProMenuTable } from '@/components/table';
import { clusterRole, clusterRoleBinding } from '@/services';
import type {
  V1ClusterRole,
  V1ClusterRoleBinding,
  V1Subject,
} from '@kubernetes/client-node';

export default () => (
  <FullPage>
    <ProMenuTable<V1ClusterRole | V1ClusterRoleBinding | any>
      commonMenuProps={{
        autoSize: true,
      }}
      menus={[
        {
          key: 'cluster-role',
          headerTitle: '集群角色',
          api: clusterRole,
          columns: [
            {
              title: '名称',
              valueType: 'text',
              dataIndex: ['metadata', 'name'],
            },
          ],
        },
        {
          key: 'cluster-role-binding',
          headerTitle: '集群角色绑定',
          api: clusterRoleBinding,
          columns: [
            {
              title: '角色',
              valueType: 'text',
              dataIndex: ['roleRef', 'name'],
            },
            {
              title: '关联对象',
              dataIndex: 'subjects',
              valueType: 'tags',
              renderText: (value: V1Subject[]) => {
                if (!value) return value;
                return value.map(({ kind, name }) => `${kind}:${name}`);
              },
            },
          ],
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
  </FullPage>
);
