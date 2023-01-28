import type { ProRenderFieldPropsType } from '@ant-design/pro-components';
import { Tag } from 'antd';
import lodash from 'lodash';

export const tags: ProRenderFieldPropsType = {
  render: (value) => {
    if (!value) return <div>-</div>;
    if (lodash.isString(value)) {
      if (value === '-') return <div>-</div>;
      return <Tag color="blue">{value}</Tag>;
    }
    const labels = [];
    if (lodash.isArray(value)) {
      let i = 1;
      for (const key of value) {
        if (labels.length) labels.push(<br key={i++} />);
        labels.push(
          <Tag key={i++} color="blue">
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
  },
  renderFormItem: (text, prop, dom) => {
    console.log({ text, prop, dom });
    return <div>hello</div>;
  },
};
