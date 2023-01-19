import { request } from '@umijs/max';
import lodash from 'lodash';

/**
 * RESTFul标准API
 */
export class RESTFul<T> {
  /**
   * 资源路径
   */
  private path: string;

  /**
   * 默认对象
   */
  private initialValue?: T;

  /**
   * 构造方法
   * @param path
   */
  constructor(path?: string, initialValue?: T) {
    this.path = path || '';
    this.initialValue = initialValue;
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
   * 生成请求数据
   *
   * @param data
   * @returns
   */
  protected buildBody(data: T) {
    if (!this.initialValue) return data;
    const body = lodash.cloneDeep(this.initialValue);
    return lodash.merge(body, data);
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
    return request(url, {
      method: 'POST',
      data: this.buildBody(data),
    });
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
    await request(url, {
      method: 'PUT',
      data: this.buildBody(data),
    });
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
