import { Button, message, Popconfirm } from 'antd';
import { V1Namespace } from '@kubernetes/client-node';
import { namespace } from '@/services';
import { CluserResourceTable } from '../resource-table/cluser';
import { NamespaceModalForm } from './editor';
import style from './style.less';

export const NamespaceTable = () => (
  <CluserResourceTable<V1Namespace>
    headerTitle="命名空间"
    api={namespace}
    tools={(ref) => [
      <NamespaceModalForm
        title="创建命名空间"
        key="create"
        afterSubmit={() => {
          ref.current?.reload();
          message.success('保存成功');
          return true;
        }}
      />,
    ]}
    columns={[
      {
        title: '标签',
        valueType: 'tags',
        dataIndex: ['metadata', 'labels'],
      },
      {
        title: '状态',
        dataIndex: ['status', 'phase'],
        width: 180,
        valueEnum: {
          Active: {
            text: '运行中',
            status: 'Success',
          },
          Terminating: {
            text: '停止中',
            status: 'Warning',
          },
        },
      },
      {
        title: '创建时间',
        dataIndex: ['metadata', 'creationTimestamp'],
        valueType: 'dateTime',
        width: 200,
      },
    ]}
    actions={({ status, metadata }, ref) => [
      <NamespaceModalForm
        title="编辑命名空间"
        key="edit"
        trigger={
          <Button
            className={style.actionBtn}
            disabled={status?.phase !== 'Active'}
            type="link"
          >
            编辑
          </Button>
        }
        name={metadata?.name}
        afterSubmit={() => {
          ref.current?.reload();
          message.success('保存成功');
          return true;
        }}
      />,
      <Popconfirm
        key="remove"
        title="警告"
        description="改操作不可撤销,你确定执行操作?"
        onConfirm={async () => {
          if (!metadata?.name) {
            ref.current?.reload();
            return;
          }
          await namespace.delete(metadata.name);
          message.success('提交成功');
          ref.current?.reload();
        }}
      >
        <Button
          className={style.actionBtn}
          disabled={status?.phase !== 'Active'}
          type="link"
        >
          删除
        </Button>
      </Popconfirm>,
    ]}
  />
);
