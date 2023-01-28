import { ProMenuTable } from '@/components/table';
import { namespacedRole, namespacedRoleBinding } from '@/services';
import type { V1Role, V1RoleBinding, V1Subject } from '@kubernetes/client-node';

export default () => (
  <ProMenuTable<V1Role | V1RoleBinding>
    menus={[
      {
        key: 'role',
        headerTitle: '角色',
        api: namespacedRole,
        columns: [
          {
            title: '名称',
            valueType: 'text',
            dataIndex: ['metadata', 'name'],
          },
        ],
      },
      {
        key: 'role-binding',
        headerTitle: '角色绑定',
        api: namespacedRoleBinding,
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
);
