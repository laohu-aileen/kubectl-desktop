import { ActionType } from '@ant-design/pro-components';
import { V1ObjectMeta } from '@kubernetes/client-node';
import { MutableRefObject } from 'react';

/**
 * 表单引用
 */
export type FormRef = MutableRefObject<ActionType | undefined>;

/**
 * 数据项接口
 */
export interface KuberneteResourceBasic {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
}
