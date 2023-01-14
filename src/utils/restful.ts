import { request } from '@umijs/max';

/**
 * RESTFul标准API
 */
export class RESTFul<T> {
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
   * 生成请求地址
   *
   * @param id
   * @returns
   */
  protected buildURL(id?: string | number): string {
    if (!id) return this.path;
    return `${this.path}/${id}`;
  }

  /**
   * 列出资源
   *
   * @returns
   */
  public list(): Promise<T[]> {
    const url = this.buildURL();
    return request(url, { method: 'GET' });
  }

  /**
   * 读取资源
   *
   * @param id
   * @param param
   * @returns
   */
  public read(id: string | number): Promise<T> {
    const url = this.buildURL(id);
    return request(url, { method: 'GET' });
  }

  /**
   * 创建资源
   *
   * @param data
   * @param param
   */
  public create(data: T): Promise<T> {
    const url = this.buildURL();
    return request(url, { method: 'POST', data });
  }

  /**
   * 修改资源
   *
   * @param data
   * @param id
   * @param param
   * @returns
   */
  public async replace(id: string | number, data: T): Promise<void> {
    const url = this.buildURL(id);
    await request(url, { method: 'PUT', data });
  }

  /**
   * 删除资源
   * @param ids
   */
  public async delete(id: string): Promise<void> {
    const url = this.buildURL(id);
    await request(url, { method: 'DELETE' });
  }
}
