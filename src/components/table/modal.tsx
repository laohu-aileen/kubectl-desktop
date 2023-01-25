import { cloneElement, useMemo, useState, MutableRefObject } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import lodash from 'lodash';
import {
  ProMenuTable,
  ProMenuTableProps,
  ProTable,
  ProTableProps,
} from './table';
import { BasicTableData } from './definition';
import style from './style.less';

/**
 * 模态窗口控制器
 */
export interface ModalAction {
  open: () => void;
  close: () => void;
}

/**
 * 模态表格参数
 */
export interface ModalTableProps<T> extends ProTableProps<T> {
  trigger?: JSX.Element;
  modalRef?: MutableRefObject<ModalAction | undefined>;
  width?: number | string;
}

/**
 * 模态表格
 *
 * @returns
 */
export const ModalTable = <T extends BasicTableData>({
  trigger,
  modalRef,
  width,
  ...props
}: ModalTableProps<T>) => {
  // 窗口开关管理
  const [open, setOpen] = useState<boolean>(false);
  if (modalRef) {
    modalRef.current = {
      open: () => setOpen(true),
      close: () => setOpen(false),
    };
  }

  // 触发按钮
  const triggerDom = useMemo(() => {
    if (!trigger) {
      return null;
    }
    return cloneElement(trigger, {
      key: 'trigger',
      ...trigger.props,
      onClick: async (e: any) => {
        setOpen(!open);
        trigger.props?.onClick?.(e);
      },
    });
  }, [setOpen, trigger, open]);

  // 表格强制属性
  const tableProps = lodash.merge(props, {
    options: {
      density: false,
      fullScreen: false,
      reload: false,
      setting: false,
    },
    toolbar: {
      settings: [
        <Button
          className={style.modalClose}
          key="close"
          size="small"
          type="text"
          icon={<CloseOutlined />}
          onClick={() => setOpen(false)}
        />,
      ],
    },
  });

  // 渲染组件
  return (
    <span>
      {triggerDom}
      <Modal
        open={open}
        footer={false}
        width={width}
        closable={false}
        wrapClassName={style.modalBox}
        destroyOnClose={true}
        maskClosable={true}
        onCancel={() => setOpen(false)}
      >
        <ProTable<T> {...tableProps} />
      </Modal>
    </span>
  );
};

/**
 * 模态菜单表格参数
 */
export interface ModalMenuTableProps<T> extends ProMenuTableProps<T> {
  trigger?: JSX.Element;
  modalRef?: MutableRefObject<ModalAction | undefined>;
  width?: number | string;
}

/**
 * 模态菜单表格
 *
 * @returns
 */
export const ModalMenuTable = <T extends BasicTableData>({
  trigger,
  modalRef,
  width,
  menus,
  ...props
}: ModalMenuTableProps<T>) => {
  // 窗口开关管理
  const [open, setOpen] = useState<boolean>(false);
  if (modalRef) {
    modalRef.current = {
      open: () => setOpen(true),
      close: () => setOpen(false),
    };
  }

  // 触发按钮
  const triggerDom = useMemo(() => {
    if (!trigger) {
      return null;
    }
    return cloneElement(trigger, {
      key: 'trigger',
      ...trigger.props,
      onClick: async (e: any) => {
        setOpen(!open);
        trigger.props?.onClick?.(e);
      },
    });
  }, [setOpen, trigger, open]);

  // 表格强制属性
  const tableMenus = menus.map((item) =>
    lodash.merge(item, {
      options: {
        density: false,
        fullScreen: false,
        reload: false,
        setting: false,
      },
      toolbar: {
        settings: [
          <Button
            className={style.modalClose}
            key="close"
            size="small"
            type="text"
            icon={<CloseOutlined />}
            onClick={() => setOpen(false)}
          />,
        ],
      },
    }),
  );

  // 渲染组件
  return (
    <span>
      {triggerDom}
      <Modal
        open={open}
        footer={false}
        width={width}
        closable={false}
        wrapClassName={style.modalBox}
        destroyOnClose={true}
        maskClosable={true}
        onCancel={() => setOpen(false)}
      >
        <ProMenuTable<T> {...props} menus={tableMenus} />
      </Modal>
    </span>
  );
};
