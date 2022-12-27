import { request } from '@umijs/max';

/**
 * RESTFul标准API
 */
export class RESTFul<T = any> {
  /**
   * 资源路径
   */
  private path: string;

  /**
   * 构造方法
   * @param path
   */
  constructor(path?: string) {
    this.path = path || '';
  }

  /**
   * 创建资源
   * @param data
   */
  public async create(data: T & any): Promise<T> {
    return request(this.path, { method: 'POST', data });
  }

  /**
   * 修改资源
   */
  public async update(id: string, data: T & any): Promise<void> {
    return request(`${this.path}/${id}`, { method: 'PATCH', data });
  }

  /**
   * 修改资源
   */
  public async put(id: string, data: T & any): Promise<void> {
    return request(`${this.path}/${id}`, { method: 'PUT', data });
  }

  /**
   * 删除资源
   * @param ids
   */
  public async delete(id: string): Promise<void> {
    return request(`${this.path}/${id}`, { method: 'DELETE' });
  }

  /**
   * 获取单个资源
   *
   * @param id
   */
  public async get(id: string): Promise<T> {
    return request(`${this.path}/${id}`, { method: 'GET' });
  }

  /**
   * 获取全部资源
   */
  public async getAll(): Promise<T[]> {
    return request(this.path, { method: 'GET' });
  }
}
