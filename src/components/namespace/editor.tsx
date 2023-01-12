import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message } from 'antd';
import {
  ModalForm,
  ProFormText,
  ProFormGroup,
  ProFormList,
} from '@ant-design/pro-components';
import { useState } from 'react';
import { V1Namespace } from '@kubernetes/client-node';
import { createNamespace, readNamespace, replaceNamespace } from '@/services';

interface FormData {
  name: string;
  labels: {
    key: string;
    value: string;
  }[];
}

interface FormProps {
  title?: string;
  trigger?: JSX.Element;
  name?: string;
  afterSubmit?: () => boolean;
}

export const NamespaceModalForm = ({
  name,
  trigger,
  title,
  afterSubmit,
}: FormProps) => {
  const [initialValues, setInitialValues] = useState<V1Namespace | undefined>(
    undefined,
  );
  return (
    <ModalForm<FormData>
      title={title || '命名空间'}
      trigger={
        trigger || (
          <Button type="primary">
            <PlusOutlined />
            创建
          </Button>
        )
      }
      layout="horizontal"
      modalProps={{
        forceRender: true,
      }}
      labelCol={{
        span: 2,
      }}
      wrapperCol={{
        span: 18,
      }}
      onFinish={async (values) => {
        const labels: { [key: string]: string } = {};
        for (const { key, value } of values.labels) {
          labels[key] = value;
        }
        const data: V1Namespace = initialValues || {
          apiVersion: 'v1',
          kind: 'Namespace',
        };
        if (!data.metadata) {
          data.metadata = {
            name: name || values.name,
          };
        }
        data.metadata.labels = labels;
        delete data.status;
        delete data.metadata.creationTimestamp;
        delete data.metadata.resourceVersion;
        delete data.metadata.managedFields;
        if (initialValues) {
          await replaceNamespace(values.name, data);
        } else {
          await createNamespace(data);
        }
        if (afterSubmit) return afterSubmit();
        message.success('保存成功');
        return true;
      }}
      request={async () => {
        if (!name) {
          return {
            name: '',
            labels: [],
          };
        }
        const data = await readNamespace(name);
        setInitialValues(data);
        const labels = data.metadata?.labels || {};
        return {
          name: data.metadata?.name || '',
          labels: Object.keys(labels).map((item) => ({
            key: item,
            value: item,
          })),
        };
      }}
    >
      <Divider style={{ margin: '12px 0 24px' }} />
      <ProFormText
        name="name"
        label="名称"
        extra="长度为 1 ~ 63 个字符，只能包含数字、小写字母和中划线（-），且首尾只能是字母或数字"
      />
      <ProFormList name="labels" label="标签">
        <ProFormGroup key="labels">
          <ProFormText name="key" placeholder="变量名称" />
          <ProFormText name="value" placeholder="变量值" />
        </ProFormGroup>
      </ProFormList>
    </ModalForm>
  );
};
