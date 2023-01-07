import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Form, message } from 'antd';
import {
  ModalForm,
  ProFormText,
  ProFormGroup,
  ProFormList,
} from '@ant-design/pro-components';
import { useEffect } from 'react';
import { V1Namespace } from '@kubernetes/client-node';

interface FormData {
  name?: string;
  labels: {
    key: string;
    value: string;
  }[];
}

interface FormProps {
  title?: string;
  trigger?: JSX.Element;
  data?: V1Namespace;
  onFinish?: () => boolean;
}

export const NamespaceModalForm = (props: FormProps) => {
  const [form] = Form.useForm<FormData>();
  const trigger = props.trigger || (
    <Button type="primary">
      <PlusOutlined />
      创建
    </Button>
  );

  useEffect(() => {
    if (!props.data) return;
    const data: FormData = {
      name: props.data.metadata?.name,
      labels: [],
    };
    // for (const key in props.data.metadata || {}) {
    //   if (!props.data.labels.hasOwnProperty(key)) continue;
    //   data.labels.push({
    //     key,
    //     value: props.data.labels[key],
    //   });
    // }
    form.setFieldsValue(data);
  }, [props.data]);

  return (
    <ModalForm<FormData>
      form={form}
      title={props.title}
      trigger={trigger}
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
        // const labels: any = {};
        // for (const item of values.labels || []) {
        //   labels[item.key] = item.value;
        // }
        // if (props.data) {
        //   await namespaceRestful.put(values.name, { labels });
        // } else {
        //   await namespaceRestful.create({
        //     name: values.name,
        //     labels,
        //   });
        //   form.resetFields();
        // }
        // if (props.onFinish) {
        //   return props.onFinish();
        // }
        console.log(values);
        message.success('提交成功');
        return true;
      }}
    >
      <Divider style={{ margin: '12px 0 24px' }} />
      <ProFormText
        name="name"
        label="名称"
        disabled={!!props.data}
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
