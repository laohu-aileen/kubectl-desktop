import { RESTFul } from '@/utils/restful';
import {
  DrawerForm as ProDrawerForm,
  DrawerFormProps as ProDrawerFormProps,
  ProFormText,
} from '@ant-design/pro-components';
import { message, Segmented } from 'antd';
import { ReactNode, useState } from 'react';
import { BasicFormData } from './definition';
import { ProFormMap } from '../input';

/**
 * 表单参数
 */
export interface DrawerFromProps<T> extends ProDrawerFormProps<T> {
  api?: RESTFul<T>;
  defaultSection?: string;
  columns?: {
    title: string;
    items: ReactNode[];
  }[];
}

/**
 * 抽屉表单
 */
export const DrawerFrom = <T extends BasicFormData>({
  api,
  defaultSection,
  columns,
  ...props
}: DrawerFromProps<T>) => {
  const [section, setSection] = useState<string>(defaultSection || '元数据');
  const sectionOptions: string[] = ['元数据'];
  const formItems: ReactNode[] = [];

  formItems.push(
    <div key="元数据" hidden={section !== '元数据'}>
      <ProFormText
        name={['metadata', 'name']}
        label="名称"
        disabled={props.initialValues?.metadata?.name}
        extra="长度为 1 ~ 63 个字符，只能包含数字、小写字母和中划线（-），且首尾只能是字母或数字"
        required
      />
      <ProFormMap
        name={['metadata', 'annotations']}
        label="注解"
        tooltip="metadata.annotations"
      />
      <ProFormMap
        name={['metadata', 'labels']}
        label="标签"
        tooltip="metadata.labels"
      />
    </div>,
  );

  // 扩展列生存
  for (const item of columns || []) {
    sectionOptions.push(item.title);
    const hidden = item.title !== section;
    formItems.push(
      <div key={item.title} hidden={hidden}>
        {item.items}
      </div>,
    );
  }

  // 数据提交方法
  const onFinish = props.onFinish;
  props.onFinish = async (value) => {
    // 拷贝数据对象
    const data: any = {};
    for (const key in value) {
      if (!Object.hasOwn(value, key)) continue;
      if (key === 'status') continue;
      if (key === 'metadata') continue;
      data[key] = value[key];
    }

    // 拷贝描述对象
    data.metadata = {};
    if (value.metadata?.annotations) {
      data.metadata.annotations = value.metadata?.annotations;
    }
    if (value.metadata?.labels) {
      data.metadata.labels = value.metadata?.labels;
    }
    if (value.metadata?.name) {
      data.metadata.name = value.metadata?.name;
    }
    if (value.metadata?.namespace) {
      data.metadata.namespace = value.metadata?.namespace;
    }
    if (value.metadata?.uid) {
      data.metadata.uid = value.metadata?.uid;
    }

    // 提交数据
    if (props.initialValues?.metadata?.name) {
      await api?.replace(data.metadata.name, data);
    } else {
      await api?.create(data);
    }

    // 后续操作
    if (onFinish) return await onFinish(data);
    message.success('保存成功');
    return true;
  };

  // 扩展栏目配置
  props.drawerProps = {
    destroyOnClose: true,
    extra: (
      <Segmented
        defaultValue={section}
        options={sectionOptions}
        onChange={(v) => setSection(`${v}`)}
      />
    ),
  };

  // 渲染表单
  return (
    <ProDrawerForm<T> trigger={<a>编辑</a>} {...props}>
      {formItems}
    </ProDrawerForm>
  );
};
