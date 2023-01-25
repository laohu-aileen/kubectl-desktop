import { ProRenderFieldPropsType } from '@ant-design/pro-components';
import { tags } from './tags';
import { link } from './link';

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
