/**
 * @title: osProTable 列表模版
 * @des: 需要做修改的搜索 “ todo ”，已经标示
 * @Time: 2021.03.17
 * @ty
 */
import React from 'react';
import { connect } from 'dva';
import OsProTable from '@/components/OsProTable'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button } from 'antd';

// todo
const OsProTableTem = props => {
  const { dispatch } = props;

  const columns = [
    /**
     * @param {ellipsis: true} 超出隐藏
     * @param {copyable: true} 可复制
     * @param {hideInTable: true} 表格里隐藏
     * @param {hideInSearch: true} 搜索里隐藏
     * @param {valueEnum} 枚举 0: { text: '全部' } // status: Default | Processing | Success | Error
     */
    { dataIndex: 'id', title: 'ID', width: 80 },
    { dataIndex: 'title', title: '标题', copyable: true, ellipsis: true, width: 220 },
    {
      dataIndex: 'status',
      title: '上下架',
      valueEnum: {
        2: { text: '全部' },
        1: { text: '上架中', status: 'Processing' },
        0: { text: '已下架', status: 'Default' },
      },
    },
    {
      dataIndex: 'times',
      title: '发布时间',
      valueType: 'dateTimeRange',
      render: v => {
        return v ? new Date(Number(v)).toLocaleString('chinese', { hour12: false }) : '-';
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      hideInSearch: true,
      render: (_, record) => {
        return (
          <a
            onClick={() => {
              console.log("编辑")
            }}
          >
            编辑
          </a>
        );
      },
    },
  ];

  /**
   * 获取数据
   * @param {Object} value
   */
  const query = async value => {
    const currentValue = {
      ...value,
    };

    // 如果有时间筛选
    if (currentValue.times && currentValue.times.length !== 0) {
      currentValue.startTime = new Date(currentValue.times[0]).getTime();
      currentValue.endTime = new Date(currentValue.times[1]).getTime();
      delete currentValue.publishTime;
    }

    const ret = {};

    if (dispatch) {
      await dispatch({
        // todo
        type: '',
        payload: { ...currentValue },
        cb: res => {
          ret = res.data;
        },
      });
    }
    return ret;
  };

  return (
    <PageHeaderWrapper>
      <OsProTable
        // todo
        headerTitle="列表"
        scroll={{ x: 1500 }}
        // todo
        rowKey="id"
        request={params => query(params)}
        columns={columns}
        toolBarRender={() => [
          <Button
            type="primary"
            onClick={() => {
              console.log('新建')
            }}
            icon="plus"
          >
             新建
           </Button>,
        ]}
      />
    </PageHeaderWrapper>
  );
};

// todo
function mapStateToProps({ loading }) {
  return {
    loading: loading.effects['']
  };
}

export default connect(mapStateToProps)(OsProTableTem);
