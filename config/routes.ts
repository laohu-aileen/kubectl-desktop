import { Route } from './types';

export default <Route[]>[
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: '主页',
    path: '/home',
    component: './home',
  },
  {
    name: '集群',
    path: '/cluster',
    routes: [
      {
        name: '集群信息',
        path: '/cluster/info',
        component: './info',
      },
      {
        name: '节点管理',
        path: '/cluster/node',
        component: './node',
      },
      {
        name: '命名空间',
        path: '/cluster/namespace',
        component: './namespace',
      },
      {
        name: '工作负载',
        path: '/cluster/workloads',
        routes: [
          {
            name: '进程',
            path: '/cluster/workloads/process',
            component: './process',
          },
          {
            name: '任务',
            path: '/cluster/workloads/job',
            component: './job',
          },
          {
            name: '容器',
            path: '/cluster/workloads/pod',
            component: './pod',
          },
          {
            path: '/cluster/workloads/pod/:ns/:id',
            component: './pod/info',
          },
        ],
      },
      {
        name: '网络',
        path: '/cluster/network',
        routes: [
          {
            name: '服务',
            path: '/cluster/network/servic',
            component: './service',
          },
          {
            name: '路由',
            path: '/cluster/network/ingress',
            component: './ingress',
          },
        ],
      },
      {
        name: '存储',
        path: '/cluster/volume',
        routes: [
          {
            name: '存储声明',
            path: '/cluster/volume/pvc',
            component: './pvc',
          },
          {
            name: '存储卷',
            path: '/cluster/volume/pv',
            component: './pv',
          },
          {
            name: '存储类',
            path: '/cluster/volume/storage-class',
            component: './storage-class',
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
            component: './config',
          },
          {
            name: '权重策略',
            path: '/cluster/config/priority-class',
            component: './priority-class',
          },
        ],
      },
      {
        name: '访问控制',
        path: '/cluster/access',
        routes: [
          {
            name: '服务账户',
            path: '/cluster/access/service-account',
            component: './service-account',
          },
          {
            name: '集群角色',
            path: '/cluster/access/cluster-role',
            component: './cluster-role',
          },
          {
            name: '角色',
            path: '/cluster/access/role',
            component: './role',
          },
        ],
      },
      {
        name: '事件',
        path: '/cluster/event',
        component: './event',
      },
      {
        name: '扩展',
        path: '/cluster/crd',
        component: './crd',
      },
    ],
  },
];
