import { namespacedEvent, namespacedPod } from '@/services';
import { useRequest, useSize } from 'ahooks';
import { PageContainer } from '@ant-design/pro-components';
import {
  CoreV1Event,
  V1Container,
  V1ContainerPort,
  V1OwnerReference,
  V1Pod,
  V1Volume,
} from '@kubernetes/client-node';
import { Link, useNavigate, useParams } from '@umijs/max';
import {
  Tag,
  Button,
  Result,
  Descriptions,
  Table,
  Space,
  Typography,
} from 'antd';
import { v1 as uuid } from 'uuid';
import { Logger } from './logger';
import style from './style.less';
import { useRef } from 'react';

const renderTags = (value?: { [key: string]: string }) => {
  if (!value) return '-';
  const keys = Object.keys(value);
  if (!keys.length) return '-';
  return Object.keys(value).map((key) => (
    <Tag key={key} color="blue">
      {key}: {value[key]}
    </Tag>
  ));
};

export default () => {
  const { ns, id } = useParams();
  const pageRef = useRef<any>();
  const contentRef = useRef<any>();
  const pageSize = useSize(pageRef);
  const contentSize = useSize(contentRef);

  let tabHeight = undefined;
  if (pageSize && contentSize) {
    tabHeight = pageSize.height - contentSize.height;
    tabHeight -= 180;
  }

  const navigate = useNavigate();
  const pod = useRequest<V1Pod | undefined, any>(async () => {
    if (!ns || !id) return undefined;
    return await namespacedPod(ns).read(id);
  });
  const events = useRequest<CoreV1Event[], any>(async () => {
    if (!ns || !id) return [];
    const list = await namespacedEvent(ns).list();
    return list.filter(({ involvedObject }) => {
      if (involvedObject.kind !== 'Pod') return false;
      if (involvedObject.namespace !== ns) return false;
      if (involvedObject.name !== id) return false;
      return true;
    });
  });

  // 资源不存在
  if (!pod.data) {
    <Result
      status="404"
      title="页面无效"
      extra={
        <Link to="..">
          <Button type="primary">返回</Button>
        </Link>
      }
    />;
  }

  // 请求资源出错
  if (pod.error) {
    <Result
      status="500"
      title="资源获取失败"
      subTitle={pod.error?.message}
      extra={
        <Link to="..">
          <Button type="primary">返回</Button>
        </Link>
      }
    />;
  }

  return (
    <div className={style.page} ref={pageRef}>
      <PageContainer
        loading={pod.loading}
        title={id}
        onBack={() => navigate('/cluster/workloads/pod')}
        tags={<Tag color="blue">{pod.data?.status?.phase}</Tag>}
        extra={[
          <Button key="edit" type="primary">
            编辑
          </Button>,
          <Button
            key="reset"
            onClick={() => {
              pod.refresh();
              events.refresh();
            }}
          >
            刷新
          </Button>,
        ]}
        content={
          <div ref={contentRef}>
            <Descriptions column={2}>
              <Descriptions.Item label="名称">
                {pod.data?.metadata?.name}
              </Descriptions.Item>
              <Descriptions.Item label="命名空间">
                {pod.data?.metadata?.namespace}
              </Descriptions.Item>
              <Descriptions.Item label="状态">
                {pod.data?.status?.phase}
              </Descriptions.Item>
              <Descriptions.Item label="创建时间">
                {pod.data?.metadata?.creationTimestamp?.toString()}
              </Descriptions.Item>
              <Descriptions.Item label="节点">
                {pod.data?.spec?.nodeName}.{pod.data?.status?.hostIP}
              </Descriptions.Item>
              <Descriptions.Item label="POD IP">
                {pod.data?.status?.podIP}
              </Descriptions.Item>
              <Descriptions.Item label="标签">
                <Typography.Paragraph>
                  {renderTags(pod.data?.metadata?.labels)}
                </Typography.Paragraph>
              </Descriptions.Item>
              <Descriptions.Item label="注解">
                <Typography.Paragraph>
                  {renderTags(pod.data?.metadata?.annotations)}
                </Typography.Paragraph>
              </Descriptions.Item>
            </Descriptions>
          </div>
        }
        tabList={[
          {
            tab: '容器',
            key: 'container',
            children: (
              <Table<V1Container>
                size="small"
                dataSource={pod.data?.spec?.containers}
                pagination={false}
                rowKey={(v) => v.name}
                columns={[
                  {
                    title: '名称',
                    dataIndex: 'name',
                  },
                  {
                    title: '镜像',
                    dataIndex: 'image',
                  },
                  {
                    title: '拉取策略',
                    dataIndex: 'imagePullPolicy',
                  },
                  {
                    title: '端口',
                    dataIndex: 'ports',
                    render: (value: V1ContainerPort[]) => (
                      <Space direction="vertical">
                        {value.map(({ protocol, containerPort }, index) => (
                          <Tag key={index} color="blue">
                            {protocol} {containerPort}
                          </Tag>
                        ))}
                      </Space>
                    ),
                  },
                ]}
              />
            ),
          },
          {
            tab: '事件',
            key: 'event',
            children: (
              <Table<CoreV1Event>
                size="small"
                dataSource={events.data}
                pagination={false}
                rowKey={(v) => v.metadata.uid || uuid()}
                columns={[
                  {
                    title: '类型',
                    dataIndex: 'type',
                    width: 80,
                  },
                  {
                    title: '消息',
                    dataIndex: 'message',
                  },
                  {
                    title: '来源',
                    dataIndex: ['source', 'component'],
                    width: 200,
                  },
                  {
                    title: '数量',
                    dataIndex: 'count',
                    width: 80,
                  },
                  {
                    title: '时间',
                    dataIndex: ['metadata', 'creationTimestamp'],
                    width: 200,
                  },
                ]}
              />
            ),
          },
          {
            tab: '创建者',
            key: 'creator',
            children: (
              <Table<V1OwnerReference>
                size="small"
                dataSource={pod.data?.metadata?.ownerReferences}
                pagination={false}
                rowKey={(v) => v.uid}
                columns={[
                  {
                    title: '名称',
                    dataIndex: 'name',
                  },
                  {
                    title: '类型',
                    dataIndex: 'kind',
                  },
                ]}
              />
            ),
          },
          {
            tab: '初始化容器',
            key: 'initContainer',
            children: (
              <Table<V1Container>
                size="small"
                dataSource={pod.data?.spec?.initContainers}
                pagination={false}
                rowKey={(v) => v.name}
                columns={[
                  {
                    title: '名称',
                    dataIndex: 'name',
                  },
                  {
                    title: '镜像',
                    dataIndex: 'image',
                  },
                  {
                    title: '拉取策略',
                    dataIndex: 'imagePullPolicy',
                  },
                  {
                    title: '端口',
                    dataIndex: 'ports',
                    render: (value: V1ContainerPort[]) => (
                      <Space direction="vertical">
                        {value.map(({ protocol, containerPort }, index) => (
                          <Tag key={index} color="blue">
                            {protocol} {containerPort}
                          </Tag>
                        ))}
                      </Space>
                    ),
                  },
                ]}
              />
            ),
          },
          {
            tab: '存储',
            key: 'volume',
            children: (
              <Table<V1Volume>
                size="small"
                dataSource={pod.data?.spec?.volumes}
                pagination={false}
                rowKey={(v) => v.name}
                columns={[
                  {
                    title: '名称',
                    dataIndex: 'name',
                  },
                  {
                    title: '类型',
                    render: (_, record) => {
                      if (record.persistentVolumeClaim) {
                        return 'persistent-volume-claim';
                      } else if (record.projected) {
                        return 'projected';
                      } else if (record.configMap) {
                        return 'config-map';
                      } else if (record.secret) {
                        return 'secret';
                      } else {
                        return '-';
                      }
                    },
                  },
                  {
                    title: '详情',
                    render: (_, record) => {
                      if (record.persistentVolumeClaim) {
                        const { claimName } = record.persistentVolumeClaim;
                        return `claimName=${claimName}`;
                      } else if (record.projected) {
                        const { defaultMode } = record.projected;
                        return `defaultMode=${defaultMode}`;
                      } else if (record.configMap) {
                        return 'config-map';
                      } else if (record.secret) {
                        return 'secret';
                      } else {
                        return '-';
                      }
                    },
                  },
                ]}
              />
            ),
          },
          {
            tab: '日志',
            key: 'log',
            children: <Logger pod={pod.data} height={tabHeight} />,
          },
        ]}
      />
    </div>
  );
};
