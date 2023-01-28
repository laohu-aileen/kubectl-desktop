import type { ProRenderFieldPropsType } from '@ant-design/pro-components';
import { link } from './link';
import { tags } from './tags';

/**
 * 扩展类型
 */
export type ValueType = 'tags' | 'link';

/**
 * 扩展值映
 */
export const valueTypeMap: Record<string, ProRenderFieldPropsType> = {
  tags,
  link,
};
