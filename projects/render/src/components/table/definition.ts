import type { V1ObjectMeta } from '@kubernetes/client-node';

/**
 * 数据项接口
 */
export interface BasicTableData {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  [key: string]: any;
}
