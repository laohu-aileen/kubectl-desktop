import type { ReactNode } from 'react';
import style from './style.less';

export const FullPage = (props: { children: ReactNode }) => (
  <div className={style.fullPage}>{props.children}</div>
);
