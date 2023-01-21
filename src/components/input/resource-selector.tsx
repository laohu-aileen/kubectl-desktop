import { ProForm, ProFormItemProps } from '@ant-design/pro-components';
import { MapInput } from './pro-form-map';
import { Space, Radio, SelectProps, Select } from 'antd';
import { ReactNode, useEffect, useState } from 'react';
import { RESTFul } from '@/utils/restful';
import { BasicFormData } from '../form';
import lodash from 'lodash';

export interface ResourceSelectProps<T> extends SelectProps {
  api?: RESTFul<T>;
}

export const ResourceSelect = <T extends BasicFormData>({
  api,
  value,
  onChange,
  ...props
}: ResourceSelectProps<T>) => {
  // 加载数据
  const [data, setData] = useState<T[]>([]);
  const index = data.findIndex((item) => lodash.isEqual(item, value));
  const currentValue = index < 0 ? undefined : index;

  // 变更重载
  useEffect(() => {
    if (!api) return setData([]);
    api.list().then((data) => setData(data));
  }, [api]);

  // 渲染组件
  return (
    <Select<number>
      {...props}
      value={currentValue}
      options={data.map((item, index) => ({
        label: item.metadata?.name,
        value: index,
      }))}
      onChange={(value) => {
        if (!onChange) return;
        onChange(data[value].metadata?.labels, []);
      }}
    />
  );
};

export interface ProFormResourceSelectProps<T> extends ProFormItemProps {
  types: {
    title: string;
    api: RESTFul<T>;
  }[];
}

export const ProFormResourceSelect = <T extends BasicFormData>({
  label,
  types,
  ...props
}: ProFormResourceSelectProps<T>) => {
  const [activeType, setActiveType] = useState<string>('main');
  const apis: {
    [key: string]: RESTFul<any>;
  } = {};
  const options: ReactNode[] = [
    <Radio.Button key="main" value="main">
      标签
    </Radio.Button>,
  ];

  // 处理资源选择器
  for (const { title, api } of types) {
    apis[title] = api;
    options.push(
      <Radio.Button key={title} value={title}>
        {title}
      </Radio.Button>,
    );
  }

  // 标签渲染
  const labelRender = (
    <Space>
      <span>{label}</span>
      <Radio.Group
        value={activeType}
        size="small"
        onChange={(e) => {
          setActiveType(e.target.value);
        }}
      >
        {options}
      </Radio.Group>
    </Space>
  );

  // 渲染表单组件
  return (
    <ProForm.Item {...props} label={labelRender}>
      {activeType === 'main' ? (
        <MapInput />
      ) : (
        <ResourceSelect<any> api={apis[activeType]} />
      )}
    </ProForm.Item>
  );
};
