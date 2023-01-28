import { persistentVolume } from '@/services';
import { ImportOutlined } from '@ant-design/icons';
import type { V1PersistentVolume } from '@kubernetes/client-node';
import { Button } from 'antd';
import { useRef } from 'react';
import type { ModalAction } from '../table';
import { ModalTable } from '../table';

/**
 * 负载选择器参数
 */
export interface PvSelectModalProps {
  trigger?: JSX.Element;
  onSelect?: (value: V1PersistentVolume) => void;
}

/**
 * 负载选择器
 *
 * @returns
 */
export const PvSelectModal = (props: PvSelectModalProps) => {
  const actionRef = useRef<ModalAction>();
  const trigger = props.trigger || (
    <Button icon={<ImportOutlined />} type="link">
      从现有存储卷中导入标签
    </Button>
  );
  return (
    <ModalTable<V1PersistentVolume>
      width={1000}
      modalRef={actionRef}
      trigger={trigger}
      headerTitle="存储卷"
      api={persistentVolume}
      options={{
        search: true,
      }}
      itemActionsRender={(record) => [
        <a
          key="selected"
          onClick={() => {
            actionRef.current?.close();
            if (!props.onSelect) return;
            props.onSelect(record);
          }}
        >
          添加
        </a>,
      ]}
      columns={[
        {
          title: '名称',
          valueType: 'text',
          dataIndex: ['metadata', 'name'],
          hideInSearch: true,
        },
        {
          title: '总量',
          valueType: 'text',
          dataIndex: ['spec', 'capacity', 'storage'],
        },
        {
          title: '状态',
          dataIndex: ['status', 'phase'],
          valueEnum: {
            Available: { text: '可用', status: 'Success' },
            Bound: { text: '绑定', status: 'Success' },
            Released: { text: '释放', status: 'Warning' },
            Failed: { text: '失败', status: 'Error' },
          },
        },
        {
          title: '存储类型',
          valueType: 'text',
          dataIndex: ['spec', 'storageClassName'],
        },
      ]}
    />
  );
};
