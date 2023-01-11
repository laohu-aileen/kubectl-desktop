import {
  createNamespacedConfigMap,
  createNamespacedSecret,
  readNamespacedConfigMap,
  readNamespacedSecret,
  replaceNamespacedConfigMap,
  replaceNamespacedSecret,
} from '@/services';
import {
  DrawerForm,
  ProFormText,
  ProFormRadio,
  ProForm,
  ProFormList,
  ProFormGroup,
  ProFormTextArea,
  ProFormSelect,
} from '@ant-design/pro-components';
import { V1ConfigMap, V1Secret } from '@kubernetes/client-node';
import { Divider, message } from 'antd';
import { useState } from 'react';

export interface ConfigEditorProps {
  namespace: string;
  name?: string;
  secret: boolean;
  afterSubmit?: () => boolean;
  title?: string;
  trigger?: JSX.Element;
}

interface ConfigEditorForm {
  name: string;
  type: string;
  immutable: 0 | 1;
  data: {
    key: string;
    value: string;
  }[];
}

interface ConfigEditorData {
  statement: V1ConfigMap | V1Secret;
  form: ConfigEditorForm;
}

const SystemSecretType: string[] = [
  'Opaque',
  'kubernetes.io/service-account-token',
  'kubernetes.io/dockercfg',
  'kubernetes.io/dockerconfigjson',
  'kubernetes.io/basic-auth',
  'kubernetes.io/ssh-auth',
  'kubernetes.io/tls',
  'bootstrap.kubernetes.io/token',
];

/**
 * 提交配置字典数据
 *
 * @param namespace
 * @param form
 * @param statement
 */
const submitConfigMap = async (
  namespace: string,
  form: ConfigEditorForm,
  statement?: V1ConfigMap,
) => {
  const value: V1ConfigMap = statement || {
    apiVersion: 'v1',
    kind: 'ConfigMap',
    metadata: {
      name: form.name,
      namespace,
    },
  };
  const data: {
    [key: string]: string;
  } = {};
  for (const { key, value } of form.data) {
    data[key] = value;
  }
  value.data = data;
  value.immutable = !!form.immutable;
  if (statement) {
    delete value.metadata?.creationTimestamp;
    delete value.metadata?.resourceVersion;
    delete value.metadata?.managedFields;
    await replaceNamespacedConfigMap(form.name, namespace, value);
  } else {
    await createNamespacedConfigMap(namespace, value);
  }
};

/**
 * 提交保密字典数据
 *
 * @param namespace
 * @param form
 * @param statement
 */
const submitSecret = async (
  namespace: string,
  form: ConfigEditorForm,
  statement?: V1Secret,
) => {
  const value: V1Secret = statement || {
    apiVersion: 'v1',
    kind: 'Secret',
    metadata: {
      name: form.name,
      namespace,
    },
  };
  const data: {
    [key: string]: string;
  } = {};
  for (const { key, value } of form.data) {
    data[key] = window.btoa(value);
  }
  value.type = form.type;
  delete value.data;
  delete value.stringData;
  value.data = data;
  value.immutable = !!form.immutable;
  if (statement) {
    delete value.metadata?.creationTimestamp;
    delete value.metadata?.resourceVersion;
    delete value.metadata?.managedFields;
    await replaceNamespacedSecret(form.name, namespace, value);
  } else {
    await createNamespacedSecret(namespace, value);
  }
};

/**
 * 请求配置字典数据
 *
 * @param name
 * @param namespace
 * @returns
 */
const requestConfigMapData = async (
  name: string,
  namespace: string,
): Promise<ConfigEditorData> => {
  const statement = await readNamespacedConfigMap(name, namespace);
  const data = statement.data || {};
  return {
    statement,
    form: {
      name: statement.metadata?.name || '',
      type: 'Opaque',
      immutable: statement.immutable ? 1 : 0,
      data: Object.keys(data).map((key) => ({
        key,
        value: data[key],
      })),
    },
  };
};

/**
 * 请求保密字典数据
 *
 * @param name
 * @param namespace
 * @returns
 */
const requestSecretData = async (
  name: string,
  namespace: string,
): Promise<ConfigEditorData> => {
  const statement = await readNamespacedSecret(name, namespace);
  let encrypt: 'data' | 'stringData' = 'data';
  if (statement.stringData) encrypt = 'stringData';
  if (statement.data) encrypt = 'data';
  const data = statement[encrypt] || {};
  return {
    statement,
    form: {
      name: statement.metadata?.name || '',
      type: statement.type || 'Opaque',
      immutable: statement.immutable ? 1 : 0,
      data: Object.keys(data).map((key) => {
        let value = data[key];
        if (encrypt === 'data') {
          value = window.atob(value);
        }
        return {
          key,
          value,
        };
      }),
    },
  };
};

/**
 * 配置编辑器
 */
export const ConfigEditor = ({
  name,
  namespace,
  afterSubmit,
  title,
  trigger,
  secret,
}: ConfigEditorProps) => {
  const [initialValues, setInitialValues] = useState<
    V1ConfigMap | V1Secret | undefined
  >(undefined);

  return (
    <DrawerForm<ConfigEditorForm>
      title={title || '编辑配置'}
      trigger={trigger || <a>编辑配置</a>}
      submitTimeout={2000}
      disabled={initialValues?.immutable}
      drawerProps={{
        destroyOnClose: true,
      }}
      onFinish={async (value) => {
        if (secret) {
          await submitSecret(namespace, value, initialValues);
        } else {
          await submitConfigMap(namespace, value, initialValues);
        }
        if (afterSubmit) return afterSubmit();
        message.success('保存成功');
        return true;
      }}
      request={async () => {
        if (!name) {
          return {
            name: '',
            type: 'Opaque',
            immutable: 0,
            data: [],
          };
        }
        const { form, statement } = secret
          ? await requestSecretData(name, namespace)
          : await requestConfigMapData(name, namespace);
        setInitialValues(statement);
        return form;
      }}
    >
      {secret ? (
        <ProFormText
          name="name"
          disabled={!!name}
          required
          label="名称"
          extra="名称长度为 1-253 字符，只能包含小写字母、数字、中划线（-）和小数点（.)"
        />
      ) : (
        <ProForm.Group>
          <ProFormText
            name="name"
            disabled={!!name}
            required
            label="名称"
            extra="名称长度为 1-253 字符，只能包含小写字母、数字、中划线（-）和小数点（.)"
          />
          <ProFormRadio.Group
            name="immutable"
            label="禁用更新"
            required
            options={[
              {
                label: '关闭',
                value: 0,
              },
              {
                label: '打开',
                value: 1,
              },
            ]}
          />
        </ProForm.Group>
      )}
      {secret ? (
        <ProForm.Group>
          <ProFormSelect
            name="type"
            label="类型"
            required
            width="lg"
            showSearch
            dependencies={['type']}
            request={async ({ type, keyWords }) => {
              const options = [...SystemSecretType];
              if (type && !SystemSecretType.includes(type)) {
                options.unshift(type);
              }
              if (keyWords && !SystemSecretType.includes(keyWords)) {
                options.unshift(keyWords);
              }
              return options.map((item) => ({
                label: item,
                value: item,
              }));
            }}
          />
          <ProFormRadio.Group
            name="immutable"
            label="禁用更新"
            required
            options={[
              {
                label: '关闭',
                value: 0,
              },
              {
                label: '打开',
                value: 1,
              },
            ]}
          />
        </ProForm.Group>
      ) : undefined}
      <Divider />
      <ProFormList
        name="data"
        label="数据"
        required
        creatorButtonProps={initialValues?.immutable ? false : undefined}
        deleteIconProps={initialValues?.immutable ? false : undefined}
        copyIconProps={initialValues?.immutable ? false : undefined}
      >
        <ProFormGroup key="group">
          <ProFormText width="sm" name="key" placeholder="名称" />
          <ProFormTextArea
            width="lg"
            name="value"
            placeholder="值"
            fieldProps={{
              autoSize: true,
              rows: 1,
            }}
          />
        </ProFormGroup>
      </ProFormList>
    </DrawerForm>
  );
};
