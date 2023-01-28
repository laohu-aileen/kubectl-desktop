import { request } from '@umijs/max';
import lodash from 'lodash';

// IPC调用方法申明
declare const ipc: (channel: string, ...args: any[]) => Promise<any>;

/**
 * 资源标准接口
 */
export interface RESTFul<T> {
  /**
   * 列出资源
   */
  list?: () => Promise<T[]>;

  /**
   * 读取资源
   *
   * @param id
   * @param param
   * @returns
   */
  read?: (id: string | number) => Promise<T>;

  /**
   * 创建资源
   *
   * @param data
   * @param param
   */
  create?: (data: T) => Promise<T>;

  /**
   * 修改资源
   *
   * @param data
   * @param id
   * @param param
   * @returns
   */
  replace?: (id: string | number, data: T) => Promise<void>;

  /**
   * 删除资源
   * @param ids
   */
  remove?: (id: string) => Promise<void>;
}

/**
 * 基础资源类
 */
export abstract class BasicRESTFul<T> {
  /**
   * 默认对象
   */
  protected initialValue?: T;

  /**
   * 构造方法
   * @param path
   */
  constructor(initialValue?: T) {
    this.initialValue = initialValue;
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
}

export class IpcRESTFul<T> extends BasicRESTFul<T> implements RESTFul<T> {
  /**
   * 资源路径
   */
  private name: string;

  /**
   * 公共参数
   */
  private args: any[];

  /**
   * 构造方法
   */
  constructor(name?: string, args?: any[], initialValue?: T) {
    super(initialValue);
    this.name = name || '';
    this.args = args || [];
  }

  /**
   * 列出资源
   *
   * @returns
   */
  public list(): Promise<T[]> {
    return ipc(`${this.name}:list`, ...this.args);
  }

  /**
   * 读取资源
   *
   * @param id
   * @param param
   * @returns
   */
  public read(id: string | number): Promise<T> {
    return ipc(`${this.name}:read`, ...this.args, id);
  }

  /**
   * 创建资源
   *
   * @param data
   * @param param
   */
  public create(data: T): Promise<T> {
    return ipc(`${this.name}:create`, ...this.args, data);
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
    return ipc(`${this.name}:replace`, ...this.args, id, data);
  }

  /**
   * 删除资源
   * @param ids
   */
  public async remove(id: string): Promise<void> {
    return ipc(`${this.name}:replace`, ...this.args, id);
  }
}

/**
 * RESTFul标准API
 */
export class HttpRESTFul<T> extends BasicRESTFul<T> implements RESTFul<T> {
  /**
   * 资源路径
   */
  private path: string;

  /**
   * 构造方法
   * @param path
   */
  constructor(path?: string, initialValue?: T) {
    super(initialValue);
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
  public async remove(id: string): Promise<void> {
    const url = this.buildURL(id);
    await request(url, { method: 'DELETE' });
  }
}
