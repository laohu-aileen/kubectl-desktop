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

  /**
   * 图标
   */
  icon?: string;

  /**
   * 新页面打开
   */
  target?: '_blank';

  /**
   * 不展示顶栏
   */
  headerRender?: boolean;

  /**
   * 不展示页脚
   */
  footerRender?: boolean;

  /**
   * 不展示菜单
   */
  menuRender?: boolean;

  /**
   * 不展示菜单顶栏
   */
  menuHeaderRender?: boolean;

  /**
   * 权限配置
   */
  access?: string;

  /**
   * 隐藏子菜单
   */
  hideChildrenInMenu?: boolean;

  /**
   * 隐藏自己和子菜单
   */
  hideInMenu?: boolean;

  /**
   * 在面包屑中隐藏
   */
  hideInBreadcrumb?: boolean;

  /**
   * 子项往上提，仍旧展示
   */
  flatMenu: boolean;

  /**
   * 固定在TAB
   */
  fixedInTab: boolean;
}
