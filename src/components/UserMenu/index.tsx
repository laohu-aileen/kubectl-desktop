import {
  BellOutlined,
  DownOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  SmileOutlined,
  UserOutlined,
} from '@ant-design/icons';
// import { useModel } from '@umijs/max';
import {
  Avatar,
  Button,
  Divider,
  Dropdown,
  MenuProps,
  message,
  Space,
  Tooltip,
} from 'antd';

/**
 * 右侧菜单
 */
export default () => {
  // const { initialState, refresh } = useModel('@@initialState');

  // 退出登陆
  const logout = async () => {
    // message.success('退出成功!', 1, refresh);
  };

  // 用户菜单
  const menu = {
    items: [
      {
        key: 'setting',
        icon: <UserOutlined />,
        label: '个人设置',
        onClick: () => {
          message.info('暂不支持该功能');
        },
      },
      {
        key: 'logout',
        icon: <LogoutOutlined />,
        label: '安全退出',
        onClick: logout,
      },
    ],
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item (disabled)
        </a>
      ),
      icon: <SmileOutlined />,
      disabled: true,
    },
    {
      key: '3',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item (disabled)
        </a>
      ),
      disabled: true,
    },
    {
      key: '4',
      danger: true,
      label: 'a danger item',
    },
  ];
  return (
    <Space size={0}>
      <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            Hover me
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
      <Divider type="vertical" />
      <Tooltip placement="bottom" title="消息通知">
        <Button icon={<BellOutlined />} size="large" type="ghost" />
      </Tooltip>
      <Tooltip placement="bottom" title="帮助中心">
        <Button icon={<QuestionCircleOutlined />} size="large" type="ghost" />
      </Tooltip>
      <Divider type="vertical" />
      <Dropdown menu={menu}>
        <Button
          type="ghost"
          icon={<Avatar size="small" icon={<UserOutlined />} />}
        >
          &nbsp;xxxx
        </Button>
      </Dropdown>
    </Space>
  );
};
