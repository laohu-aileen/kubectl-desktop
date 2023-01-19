import { Route } from './types';

export default <Route[]>[
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: '主页',
    path: '/home',
    component: './Home',
  },
  {
    name: '集群',
    path: '/cluster',
    routes: [
      {
        name: '集群信息',
        path: '/cluster/info',
        component: './cluster/info',
      },
      {
        name: '节点管理',
        path: '/cluster/nodes',
        component: './cluster/node',
      },
      {
        name: '命名空间',
        path: '/cluster/namespaces',
        component: './cluster/namespace',
      },
      {
        name: '工作负载',
        path: '/cluster/workloads',
        routes: [
          {
            name: '进程',
            path: '/cluster/workloads/process',
            component: './cluster/process',
          },
          {
            name: '任务',
            path: '/cluster/workloads/jobs',
            component: './cluster/job',
          },
          {
            name: '容器',
            path: '/cluster/workloads/pods',
            component: './cluster/pod',
          },
        ],
      },
      {
        name: '网络',
        path: '/cluster/network',
        routes: [
          {
            name: '服务',
            path: '/cluster/network/services',
            component: './cluster/service',
          },
          {
            name: '路由',
            path: '/cluster/network/ingress',
            component: './cluster/ingress',
          },
        ],
      },
      {
        name: '存储',
        path: '/cluster/volume',
        routes: [
          {
            name: '存储声明',
            path: '/cluster/volume/persistent-volume-claims',
            component: './cluster/persistent-volume-claim',
          },
          {
            name: '存储卷',
            path: '/cluster/volume/persistent-volume',
            component: './cluster/persistent-volume',
          },
          {
            name: '存储类',
            path: '/cluster/volume/storage-classes',
            component: './cluster/storage-class',
          },
        ],
      },
      {
        name: '配置管理',
        path: '/cluster/config',
        routes: [
          {
            name: '环境配置',
            path: '/cluster/config/config',
            component: './cluster/config',
          },
          {
            name: '权重策略',
            path: '/cluster/config/priority-classes',
            component: './cluster/priority-class',
          },
        ],
      },
      {
        name: '访问控制',
        path: '/cluster/access',
        routes: [
          {
            name: '服务账户',
            path: '/cluster/access/service-accounts',
            component: './cluster/service-account',
          },
          {
            name: '集群角色',
            path: '/cluster/access/cluster-roles',
            component: './cluster/cluster-role',
          },
          {
            name: '角色',
            path: '/cluster/access/roles',
            component: './cluster/role',
          },
        ],
      },
      {
        name: '事件',
        path: '/cluster/events',
        component: './cluster/event',
      },
      {
        name: '扩展',
        path: '/cluster/custom-resource-definitions',
        component: './cluster/custom-resource-definition',
      },
    ],
  },
];
