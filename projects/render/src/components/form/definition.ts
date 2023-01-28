import type { V1ObjectMeta } from '@kubernetes/client-node';

/**
 * 数据项接口
 */
export interface BasicFormData {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  [key: string]: any;
}
