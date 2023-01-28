import { namespacedLogtail } from '@/services';
import { SyncOutlined } from '@ant-design/icons';
import type { V1Pod } from '@kubernetes/client-node';
import CodeMirror from '@uiw/react-codemirror';
import { useRequest } from 'ahooks';
import { Button, Card, Checkbox, Divider, Radio, Select, Space } from 'antd';
import { useEffect, useState } from 'react';

export interface LoggerProps {
  pod?: V1Pod;
  height?: number;
}

export const Logger = ({ pod, height }: LoggerProps) => {
  const [container, setContainer] = useState<string>();
  const [lines, setLines] = useState<number>(50);
  const [autoSync, setAutoSync] = useState<boolean>(true);

  const { data, run, cancel, refresh } = useRequest<string, any>(
    async () => {
      if (!pod || !pod.metadata) return '';
      const { name, namespace } = pod.metadata;
      if (!name || !namespace) return '';
      if (!container) return '';
      return await namespacedLogtail(namespace, name).pull({
        container,
        lines,
      });
    },
    {
      pollingInterval: 1000,
      pollingWhenHidden: false,
      ready: !!container,
    },
  );

  // POD变更处理
  useEffect(() => {
    if (!pod?.spec?.containers) return;
    if (!pod.spec.containers.length) return;
    const { name } = pod.spec.containers[0];
    setContainer(name);
  }, [pod]);

  // 自动同步控制
  useEffect(() => {
    if (autoSync) {
      run();
    } else {
      cancel();
    }
  }, [autoSync]);

  // 条件变更处理
  useEffect(() => {
    refresh();
  }, [container, lines]);

  return (
    <Card
      size="small"
      bodyStyle={{
        backgroundColor: '#282c34',
      }}
      title={
        <Space>
          <span>容器:</span>
          <Radio.Group
            size="small"
            value={container}
            onChange={({ target }) => setContainer(target.value)}
          >
            {pod?.spec?.containers.map((item) => (
              <Radio.Button key={item.name} value={item.name}>
                {item.name}
              </Radio.Button>
            )) || []}
          </Radio.Group>
          <Divider type="vertical" />
          <span>显示行数:</span>
          <Select
            value={lines}
            style={{ width: 80 }}
            size="small"
            onChange={(value) => setLines(value)}
            options={[
              { value: 50, label: '50' },
              { value: 100, label: '100' },
              { value: 200, label: '200' },
            ]}
          />
        </Space>
      }
      extra={[
        <Checkbox
          key="autoSync"
          checked={autoSync}
          onChange={({ target }) => setAutoSync(target.checked)}
        >
          自动刷新
        </Checkbox>,
        <Divider key="divider" type="vertical" />,
        <Button key="refresh" size="small" onClick={run}>
          <SyncOutlined spin={autoSync} />
        </Button>,
      ]}
    >
      <CodeMirror
        value={data}
        height={height ? `${height - 63}px` : undefined}
        theme="dark"
        readOnly={true}
        editable={false}
        basicSetup={false}
      />
    </Card>
  );
};
