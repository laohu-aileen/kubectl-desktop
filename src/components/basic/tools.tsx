import { Divider } from 'antd';
import { ReactNode } from 'react';

export interface ColumnActionToolProps {
  actions?: ReactNode[];
}

/**
 * 列操作菜单
 *
 * @param value
 * @returns
 */
export const ColumnActionTool = ({ actions }: ColumnActionToolProps) => {
  if (!actions) return <div />;
  const elements: ReactNode[] = [];
  for (let i = 0; i < actions.length; i++) {
    if (i) elements.push(<Divider key={`d${i}`} type="vertical" />);
    elements.push(actions[i]);
  }
  return <div>{elements}</div>;
};
