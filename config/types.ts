export interface Route {
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
