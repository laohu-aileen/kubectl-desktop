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
import { Divider, Form, message } from 'antd';

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
  encrypt: 'data' | 'stringData';
  data: {
    key: string;
    value: string;
  }[];
}

interface ConfigEditorData {
  statement?: V1ConfigMap | V1Secret;
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
  console.log({ value, form, namespace, statement });
  if (statement) {
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
    data[key] = form.encrypt === 'data' ? window.btoa(value) : value;
  }
  value.type = form.type;
  delete value.data;
  delete value.stringData;
  value[form.encrypt] = data;
  if (statement) {
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
      encrypt: 'data',
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
      encrypt,
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
  const [form] = Form.useForm<ConfigEditorData>();
  return (
    <DrawerForm<ConfigEditorData>
      form={form}
      title={title || '编辑配置'}
      trigger={trigger || <a>编辑配置</a>}
      submitTimeout={2000}
      drawerProps={{
        destroyOnClose: true,
      }}
      onFinish={async ({ form, statement, ...other }) => {
        console.log(11111, { form, statement, other });
        if (secret) {
          await submitSecret(namespace, form, statement);
        } else {
          await submitConfigMap(namespace, form, statement);
        }
        if (afterSubmit) return afterSubmit();
        message.success('保存成功');
        return true;
      }}
      request={async () => {
        console.log({ name });
        if (!name) {
          return {
            form: {
              name: '',
              type: 'Opaque',
              encrypt: 'data',
              data: [],
            },
          };
        }
        return secret
          ? await requestSecretData(name, namespace)
          : await requestConfigMapData(name, namespace);
      }}
    >
      <ProFormText
        name={['form', 'name']}
        disabled={!!name}
        required
        label="名称"
        extra="名称长度为 1-253 字符，只能包含小写字母、数字、中划线（-）和小数点（.)"
      />

      {secret ? (
        <ProForm.Group>
          <ProFormSelect
            name={['form', 'type']}
            label="类型"
            required
            width="lg"
            showSearch
            dependencies={['form']}
            request={async ({ form, keyWords }) => {
              const options = [...SystemSecretType];
              if (form.type && !SystemSecretType.includes(form.type)) {
                options.unshift(form.type);
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
            name={['form', 'encrypt']}
            label="编码"
            required
            options={[
              {
                label: 'Base64',
                value: 'data',
              },
              {
                label: '字符串',
                value: 'stringData',
              },
            ]}
          />
        </ProForm.Group>
      ) : undefined}
      <Divider />
      <ProFormList name={['form', 'data']} label="数据" required>
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
