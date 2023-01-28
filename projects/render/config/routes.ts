import type { Route } from './types';

export default <Route[]>[
  {
    path: '/',
    redirect: '/cluster',
  },
  {
    name: '集群',
    path: '/cluster',
    component: './cluster',
  },
  {
    name: '节点',
    path: '/node',
    component: './node',
  },
  {
    name: '命名空间',
    path: '/namespace',
    component: './namespace',
  },
  {
    name: '工作负载',
    path: '/workloads',
    routes: [
      {
        name: '进程',
        path: '/workloads/process',
        component: './process',
      },
      {
        name: '任务',
        path: '/workloads/job',
        component: './job',
      },
      {
        name: '容器',
        path: '/workloads/pod',
        component: './pod',
      },
      {
        path: '/workloads/pod/:ns/:id',
        component: './pod/info',
      },
    ],
  },
  {
    name: '网络',
    path: '/network',
    routes: [
      {
        name: '服务',
        path: '/network/servic',
        component: './service',
      },
      {
        name: '路由',
        path: '/network/ingress',
        component: './ingress',
      },
    ],
  },
  {
    name: '存储',
    path: '/volume',
    routes: [
      {
        name: '存储声明',
        path: '/volume/pvc',
        component: './pvc',
      },
      {
        name: '存储卷',
        path: '/volume/pv',
        component: './pv',
      },
      {
        name: '存储类',
        path: '/volume/storage-class',
        component: './storage-class',
      },
    ],
  },
  {
    name: '配置管理',
    path: '/config',
    routes: [
      {
        name: '环境配置',
        path: '/config/map',
        component: './config',
      },
      {
        name: '权重策略',
        path: '/config/priority-class',
        component: './priority-class',
      },
    ],
  },
  {
    name: '访问控制',
    path: '/access',
    routes: [
      {
        name: '服务账户',
        path: '/access/service-account',
        component: './service-account',
      },
      {
        name: '集群角色',
        path: '/access/cluster-role',
        component: './cluster-role',
      },
      {
        name: '角色',
        path: '/access/role',
        component: './role',
      },
    ],
  },
  {
    name: '事件',
    path: '/event',
    component: './event',
  },
  {
    name: '扩展',
    path: '/crd',
    component: './crd',
  },
];
