import { CloseCircleFilled, EditFilled, PlusOutlined } from '@ant-design/icons';
import { Button, Input, InputProps, Modal } from 'antd';
import { useEffect, useState } from 'react';
import lodash from 'lodash';

/**
 * 字典对象
 */
interface ObjectMap {
  [key: string]: string;
}

export interface MapInputProps {
  keyProps?: InputProps;
  valueProps?: InputProps;
  onChange?: (value: any) => any;
  value?: ObjectMap;
}

export const MapInput = (props: MapInputProps) => {
  // 表单数据定义
  const [list, setList] = useState<
    {
      key: string;
      value: string;
    }[]
  >([]);

  const [valueEdit, setValueEdit] = useState<{
    open: boolean;
    index?: number;
    title?: string;
    value?: string;
  }>({ open: false });

  // 外部数值变更
  useEffect(() => {
    const value = props.value || {};
    for (const key of Object.keys(value)) {
      const index = list.findIndex((item) => item.key === key);
      if (index < 0) {
        list.push({ key, value: value[key] });
      } else {
        list[index].value = value[key];
      }
    }
    setList([...list]);
  }, [props.value]);

  // 表单参数解析
  const keyProps = props.keyProps || {};
  const valueProps = props.valueProps || {};

  // 表单宽度设置
  if (!keyProps.style) keyProps.style = {};
  keyProps.style.width = '40%';
  if (!valueProps.style) valueProps.style = {};
  valueProps.style.width = '60%';

  // 值变更处理
  const valueChange = () => {
    setList(list.filter((item) => item));
    if (!props.onChange) return;
    const data: ObjectMap = {};
    for (const item of list) {
      if (!item) continue;
      if (!item.key) continue;
      if (lodash.has(data, item.key)) continue;
      data[item.key] = item.value;
    }
    props.onChange(data);
  };

  // KEY 重复统计
  const keysCount: { [key: string]: number } = {};
  for (const { key } of list) {
    if (keysCount[key]) keysCount[key] += 1;
    else keysCount[key] = 1;
  }

  // 渲染组件
  return (
    <div>
      {list.map((item, index) => (
        <Input.Group key={index} compact style={{ marginBottom: 8 }}>
          <Input
            placeholder="名称"
            {...keyProps}
            status={keysCount[item.key] > 1 ? 'warning' : undefined}
            value={item.key}
            onChange={({ currentTarget }) => {
              list[index].key = currentTarget.value;
              valueChange();
            }}
            allowClear={{
              clearIcon: (
                <CloseCircleFilled
                  onClick={(e) => {
                    e.stopPropagation();
                    delete list[index];
                    valueChange();
                  }}
                />
              ),
            }}
          />
          <Input
            placeholder="值"
            {...valueProps}
            value={item.value}
            onChange={({ currentTarget }) => {
              list[index].value = currentTarget.value;
              valueChange();
            }}
            allowClear={{
              clearIcon: (
                <EditFilled
                  onClick={(e) => {
                    e.stopPropagation();
                    setValueEdit({
                      open: true,
                      index,
                      title: item.key,
                      value: item.value,
                    });
                  }}
                />
              ),
            }}
          />
        </Input.Group>
      ))}
      <Button
        type="dashed"
        icon={<PlusOutlined />}
        style={{ width: '100%' }}
        onClick={() => {
          list.push({ key: '', value: '' });
          setList([...list]);
        }}
      >
        添加一行数据
      </Button>
      <Modal
        open={valueEdit.open}
        title={valueEdit.title}
        footer={null}
        width={720}
        onCancel={() => setValueEdit({ open: false })}
      >
        <Input.TextArea
          autoSize={{ minRows: 10, maxRows: 20 }}
          value={valueEdit.value}
          onChange={({ currentTarget }) => {
            if (valueEdit.index === undefined) return;
            list[valueEdit.index].value = currentTarget.value;
            setValueEdit({ ...valueEdit, value: currentTarget.value });
            valueChange();
          }}
        />
      </Modal>
    </div>
  );
};
