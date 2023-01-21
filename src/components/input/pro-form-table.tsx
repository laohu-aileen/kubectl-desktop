import { ValueType } from '@/value-types';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import {
  EditableProTable,
  ProColumns,
  ProForm,
  ProFormItemProps,
} from '@ant-design/pro-components';
import { Button } from 'antd';
import style from './style.less';

export interface EditorTableProps<T> {
  indexKey?: string;
  maxLength?: number;
  columns: ProColumns<T, ValueType>[];
  onChange?: (value: any) => any;
  value?: T[];
}

export const EditorTable = <T extends Record<string, any>>({
  indexKey,
  maxLength,
  columns,
  onChange,
  value,
}: EditorTableProps<T>) => {
  const data: T[] = [];
  const editableKeys: number[] = [];
  const inputValue = value || [];
  const rowKey = indexKey || '__index';

  if (!inputValue.length) {
    return (
      <Button
        type="dashed"
        icon={<PlusOutlined />}
        style={{ width: '100%' }}
        onClick={() => {
          if (!onChange) return;
          onChange([{}]);
        }}
      >
        添加一行数据
      </Button>
    );
  }

  // 数据处理
  for (let key = 0; key < inputValue.length; key++) {
    editableKeys.push(key);
    const value: any = { ...inputValue[key] };
    value[rowKey] = key;
    data.push(value);
  }

  // 操作表单
  const action: ProColumns<T, ValueType> = {
    width: 48,
    align: 'center',
    dataIndex: rowKey,
    renderFormItem: ({ index }) => (
      <Button
        className={style.btnClose}
        icon={<CloseOutlined />}
        size="small"
        type="text"
        onClick={() => {
          if (index === undefined) return;
          if (!onChange) return;
          onChange(inputValue.filter((_, i) => i !== index));
        }}
      />
    ),
  };

  // 渲染组件
  return (
    <EditableProTable<T, T, ValueType>
      size="small"
      maxLength={maxLength}
      rowKey={rowKey}
      className={style.editorTable}
      columns={[...columns, action]}
      value={data}
      editable={{
        type: 'multiple',
        editableKeys,
      }}
      controlled={true}
      recordCreatorProps={{
        newRecordType: 'dataSource',
        style: { marginBottom: 0 },
        record: (index) => {
          const res: any = {};
          res[rowKey] = index + 1;
          return res;
        },
      }}
      onChange={(value) => {
        const list = value.map((item) => {
          delete item[rowKey];
          return { ...item };
        });
        if (!onChange) return;
        onChange(list);
      }}
    />
  );
};

export interface ProFormEditorTableProps<T> extends ProFormItemProps<T> {
  indexKey?: string;
  maxLength?: number;
  columns: ProColumns<T, ValueType>[];
}

/**
 * 字典表单
 *
 * @param props
 * @returns
 */
export const ProFormEditorTable = <T extends Record<string, any>>({
  indexKey,
  maxLength,
  columns,
  ...props
}: ProFormEditorTableProps<T>) => (
  <ProForm.Item {...props}>
    <EditorTable<T>
      columns={columns}
      indexKey={indexKey}
      maxLength={maxLength}
    />
  </ProForm.Item>
);
