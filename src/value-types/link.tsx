import { ProRenderFieldPropsType } from '@ant-design/pro-components';
import { Link } from '@umijs/max';
import { LinkProps } from 'react-router-dom';

export const link: ProRenderFieldPropsType = {
  render: (value: LinkProps) => <Link {...value} />,
};
