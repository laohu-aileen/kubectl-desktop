interface Route {
  /**
   * 路由名称
   */
  name?: string;

  /**
   * 路由标题
   */
  title?: string;

  /**
   * 地址路径
   */
  path: string;

  /**
   * 组件路径
   */
  component?: string;

  /**
   * 子路由
   */
  routes?: Route[];

  /**
   * 跳转路由
   */
  redirect?: string;

  /**
   * 包装器
   */
  wrappers?: string[];
}

export default <Route[]>[
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: '首页',
    path: '/home',
    component: './Home',
  },
  {
    name: '命名空间',
    path: '/namespaces',
    component: './namespaces',
  },
  {
    name: '工作负载',
    path: '/workloads',
    routes: [
      {
        name: '控制器',
        path: '/workloads/deplayment',
        component: './workloads/Deplayment',
      },
      {
        name: '容器组',
        path: '/workloads/pods',
        component: './workloads/Pod',
      },
    ],
  },
  {
    name: '网络',
    path: '/network',
    routes: [
      {
        name: '服务',
        path: '/network/service',
        component: './Home',
      },
      {
        name: '路由',
        path: '/network/route',
        component: './Home',
      },
    ],
  },
  {
    name: '配置管理',
    path: '/configure',
    routes: [
      {
        name: '环境配置',
        path: '/configure/public',
        component: './Home',
      },
      {
        name: '保密字典',
        path: '/configure/secret',
        component: './Home',
      },
    ],
  },
];
