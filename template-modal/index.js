/**
 * @title: ant modal模版
 * @des: 需要做修改的搜索 “ todo ”，已经标示
 * @Time: 2020.08.14
 * @ty
 */
import React from 'react';
import { Modal } from 'antd';
import { connect } from 'dva';

// todo
const Modal = props => {
  const { visible = false, handleCancel, onSubmit } = props;

  return (
    <>
      <Modal
        title=""
        onCancel={() => {
          handleCancel();
        }}
        onOk={() => {
          onSubmit();
        }}
        okText="提交"
        cancelText="取消"
        visible={visible}
        destroyOnClose
      >
        <div>modal模版</div>
      </Modal>
    </>
  );
};

export default connect(({ loading }) => ({
  loading: loading.effeccts[''],
}))(Modal);
