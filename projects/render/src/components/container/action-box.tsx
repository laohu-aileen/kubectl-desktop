import type { ReactNode } from 'react';
import style from './style.less';

export interface ActionBoxProps {
  children?: ReactNode;
  action?: ReactNode;
}

export const ActionBox = ({ children, action, ...props }: ActionBoxProps) => (
  <div {...props} className={style.actionBox}>
    <div className={style.actionBoxTool}>{action}</div>
    <div className={style.actionBoxContent}>{children}</div>
  </div>
);
