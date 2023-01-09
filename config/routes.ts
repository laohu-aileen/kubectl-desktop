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
            name: '进程',
            path: '/cluster/workloads/process',
            component: './cluster/workload/process',
          },
          {
            name: '任务',
            path: '/cluster/workloads/jobs',
            component: './cluster/workload/job',
          },
          {
            name: '容器',
            path: '/cluster/workloads/pods',
            component: './cluster/workload/pod',
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
            component: './cluster/network/service',
          },
          {
            name: '路由',
            path: '/cluster/network/ingress',
            component: './cluster/network/ingress',
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
            component: './cluster/config/config',
          },
          {
            name: '权重策略',
            path: '/cluster/config/priority-classes',
            component: './cluster/config/priority-class',
          },
        ],
      },
      {
        name: '存储',
        path: '/cluster/volume',
        routes: [
          {
            name: '已申请',
            path: '/cluster/volume/persistent-volume-claims',
            component: './Home',
          },
          {
            name: '持久卷',
            path: '/cluster/volume/persistent-volume',
            component: './Home',
          },
          {
            name: '动态卷',
            path: '/cluster/volume/storage-classes',
            component: './Home',
          },
        ],
      },
    ],
  },
];
