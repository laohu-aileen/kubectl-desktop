import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Tag } from 'antd';
import { useRef } from 'react';

/**
 * 部署控制器
 */
export interface Deployment {
  /**
   * 服务名
   */
  name: string;

  /**
   * 就绪状态
   */
  ready: {
    total: number;
    ready: number;
  };

  /**
   * 镜像
   */
  images: {
    [key: string]: string;
  };

  /**
   * 标签
   */
  lable: {
    [key: string]: string;
  };

  /**
   * 选择器
   */
  selector: {
    [key: string]: string;
  };

  /**
   * 创建时间
   */
  createDate: number;
}

/**
 * 字典转列表
 *
 * @param map
 * @returns
 */
const toList = (map: {
  [key: string]: string;
}): { key: string; value: string }[] => {
  const tags: { key: string; value: string }[] = [];
  for (const key in map) {
    if (!map.hasOwnProperty(key)) continue;
    tags.push({ key, value: map[key] });
  }
  return tags;
};

export default () => {
  const actionRef = useRef<ActionType>();

  // 表字段
  const columns: ProColumns<Deployment>[] = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '容器组',
      dataIndex: 'ready',
      render: ({ total, ready }: any) => `${ready}/${total}`,
    },
    {
      title: '镜像',
      dataIndex: 'images',
      render: (value: any) =>
        toList(value).map(({ key, value }) => <Tag key={key}>{value}</Tag>),
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      valueType: 'option',
      render: () => [
        <a key="info" type="primary">
          详情
        </a>,
        <a key="edit" type="primary">
          编辑
        </a>,
        <a key="replicas" type="primary">
          伸缩
        </a>,
        <a key="monitor" type="primary">
          监控
        </a>,
      ],
    },
  ];

  // 渲染页
  return (
    <ProTable<Deployment>
      actionRef={actionRef}
      search={false}
      columns={columns}
      rowKey="name"
      toolbar={{
        // filter: (
        //   <LightFilter>
        //     <ProFormDatePicker name="startdate" label="响应日期" />
        //   </LightFilter>
        // ),
        menu: {
          type: 'tab',
          // activeKey: "tab1",
          items: [
            {
              key: 'a',
              label: <span>无状态</span>,
            },
            {
              key: 'b',
              label: <span>有状态</span>,
            },
            {
              key: 'c',
              label: <span>守护进程集</span>,
            },
            {
              key: 'd',
              label: <span>任务</span>,
            },
            {
              key: 'e',
              label: <span>定时任务</span>,
            },
          ],
          onChange: (key) => {
            console.log(key);
          },
        },
        search: {
          placeholder: '名称/镜像',
        },
        actions: [
          <Button key="image" type="primary">
            镜像创建
          </Button>,
          <Button key="template">模板创建</Button>,
        ],
      }}
      request={async () => {
        const data: Deployment[] = [];
        for (let i = 0; i < 100; i++) {
          data.push({
            name: 'api-gateway-endpoint-' + i,
            ready: { total: 5, ready: 5 },
            images: {
              main: 'op-docker.fzzixun.com/a1-05-znenvgroup-vps-dev/api-gateway-endpoint:dev.v1.1.0-c7d8d4',
            },
            lable: {},
            selector: {},
            createDate: Date.now(),
          });
        }
        return { data, success: true };
      }}
    />
  );
};
