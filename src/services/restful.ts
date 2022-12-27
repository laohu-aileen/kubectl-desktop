import { request } from '@umijs/max';

/**
 * 资源方法
 */
export type REST_METHODS = 'create' | 'update' | 'delete' | 'get' | 'getAll';

/**
 * RESTFul标准API
 */
export class RESTFul<T = any> {
  /**
   * 资源路径
   */
  private path: string;

  /**
   * 允许方法
   */
  private methods: REST_METHODS[];

  /**
   * 构造方法
   * @param path
   */
  constructor(path?: string, methods?: REST_METHODS[]) {
    this.path = path || '';
    this.methods = methods || [];
  }

  /**
   * 创建资源
   * @param data
   */
  public async create(data: T): Promise<T> {
    console.log(data);
    return <any>{};
  }

  /**
   * 修改资源
   */
  public async update(id: string, data: T & any): Promise<void> {
    this.methodCheck('update');
    return request(`${this.path}/${id}`, { method: 'PATCH', data });
  }

  // /**
  //  * 删除资源
  //  * @param ids
  //  */
  // public async delete(...ids: any[]): Promise<void> {}

  /**
   * 获取单个资源
   *
   * @param id
   */
  public async get(id: string): Promise<T> {
    this.methodCheck('get');
    return request(`${this.path}/${id}`, { method: 'GET' });
  }

  /**
   * 获取全部资源
   */
  public async getAll(): Promise<T[]> {
    this.methodCheck('getAll');
    return request(this.path, { method: 'GET' });
  }

  /**
   * 方法检查
   *
   * @param method
   * @returns
   */
  protected methodCheck(method: REST_METHODS) {
    if (this.methods.includes(method)) return;
    throw new Error(`方法 ${method} 不允许执行`);
  }
}
