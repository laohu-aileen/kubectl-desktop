import { Tag } from 'antd';

export interface TagColumnProps {
  value?: { [key: string]: string } | string[];
}

/**
 * 表格 TAG 列
 *
 * @param value
 * @returns
 */
export const TagColumn = ({ value }: TagColumnProps) => {
  if (!value) return <div>-</div>;
  if (typeof value === 'string') {
    if (value === '-') return <div>-</div>;
    return <Tag color="blue">{value}</Tag>;
  }
  const labels = [];
  if (value instanceof Array) {
    for (const key of value) {
      if (labels.length) labels.push(<br key={`${key}-br`} />);
      labels.push(
        <Tag key={key} color="blue">
          {key}
        </Tag>,
      );
    }
  } else {
    for (const key in value) {
      if (!value.hasOwnProperty(key)) continue;
      if (labels.length) labels.push(<br key={`${key}-br`} />);
      const item = key + ':' + value[key];
      labels.push(
        <Tag key={key} color="blue">
          {item}
        </Tag>,
      );
    }
  }
  if (!labels.length) return <div>-</div>;
  return <div>{labels}</div>;
};
