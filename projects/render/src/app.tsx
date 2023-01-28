import type { ProLayoutProps } from '@ant-design/pro-components';
import type { RequestConfig } from '@umijs/max';
declare const BASE_URL: string;

export interface InitialState {
  logged: boolean;
}

export const getInitialState = async (): Promise<InitialState> => {
  return { logged: true };
};

export const layout = (): ProLayoutProps => ({
  logo: false,
  title: 'KUBERNETES',
  collapsed: false,
  fixSiderbar: true,
  layout: 'side',
  disableMobile: true,
  rightContentRender: false,
  collapsedButtonRender: false,
  siderWidth: 180,
  menu: {
    locale: false,
    type: 'sub',
  },
});

export const request: RequestConfig = {
  baseURL: BASE_URL,
  timeout: 5000,
};
