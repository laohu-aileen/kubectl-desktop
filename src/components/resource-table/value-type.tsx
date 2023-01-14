import { ProRenderFieldPropsType } from '@ant-design/pro-components';
import { TagColumn } from '../basic';

/**
 * 扩展类型
 */
export type ValueTypeExts = 'tags';

/**
 * 扩展配置
 */
export const valueTypeMap: Record<string, ProRenderFieldPropsType> = {
  tags: {
    render: (value) => <TagColumn value={value} />,
  },
};
