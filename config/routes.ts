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
        name: '事件',
        path: '/cluster/events',
        component: './cluster/event',
      },
      {
        name: '工作负载',
        path: '/cluster/workloads',
        routes: [
          {
            name: '服务部署',
            path: '/cluster/workloads/services',
            component: './cluster/workload/service',
          },
        ],
      },
    ],
  },
  {
    name: '运行环境',
    path: '/environment/:ns',
    routes: [
      {
        name: '工作负载',
        path: '/environment/:ns/workloads',
        routes: [
          {
            name: '控制器',
            path: '/environment/:ns/workloads/deplayment',
            component: './workloads/Deplayment',
          },
          {
            name: '容器组',
            path: '/environment/:ns/workloads/pods',
            component: './workloads/Pod',
          },
        ],
      },
      {
        name: '网络',
        path: '/environment/:ns/network',
        routes: [
          {
            name: '服务',
            path: '/environment/:ns/network/service',
            component: './Home',
          },
          {
            name: '路由',
            path: '/environment/:ns/network/route',
            component: './Home',
          },
        ],
      },
      {
        name: '配置管理',
        path: '/environment/:ns/configure',
        routes: [
          {
            name: '环境配置',
            path: '/environment/:ns/configure/public',
            component: './Home',
          },
          {
            name: '保密字典',
            path: '/environment/:ns/configure/secret',
            component: './Home',
          },
        ],
      },
    ],
  },
];
