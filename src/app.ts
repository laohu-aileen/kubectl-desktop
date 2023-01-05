import { ProLayoutProps } from '@ant-design/pro-components';
import { RequestConfig } from '@umijs/max';
import UserMenu from './components/UserMenu';
declare const BASE_URL: string;

export interface InitialState {
  logged: boolean;
}

export const getInitialState = async (): Promise<InitialState> => {
  return { logged: true };
};

export const layout = (): ProLayoutProps => ({
  title: 'KUBERNETES | 管理中心',
  fixSiderbar: true,
  layout: 'mix',
  splitMenus: true,
  rightContentRender: UserMenu,
  menu: {
    locale: false,
    type: 'sub',
  },
});

export const request: RequestConfig = {
  baseURL: BASE_URL,
  timeout: 5000,
};
