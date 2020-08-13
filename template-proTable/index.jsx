/**
 * @title: proTable 列表模版
 * @des: 需要做修改的搜索 “ todo ”，已经标示
 * @Time: 2020.06.29
 * @ty
 */
import React, { useRef } from 'react';
import { connect } from 'dva';
import ProTable from '@ant-design/pro-table';
import { Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
// import ImgPreview from '@/components/ImgPreview';

// todo
const proTableTem = props => {
  const { dispatch } = props;
  const actionRef = useRef(); // actionRef.current.reload();

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
      dataIndex: 'pictureList',
      title: '图片',
      hideInSearch: true,
      render: item => {
        return item.length > 0 && <ImgPreview src={item[0]} />;
      },
    },
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
          <Space>
            <a
              onClick={() => {
                console.log("编辑")
              }}
            >
              编辑
            </a>
          </Space>
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

    const ret = {
      data: [],
    };
    // 改变页面字段
    currentValue.currentPage = currentValue.current;
    delete currentValue.current;
    if (dispatch) {
      await dispatch({
        // todo
        type: '',
        payload: { ...currentValue },
        cb: res => {
          ret.data = res.data;
          ret.total = res.totalCount;
        },
      });
    }
    return ret;
  };

  return (
    <div style={{padding: 24}}>
      <ProTable
        // todo
        headerTitle="列表"
        scroll={{ x: 1500 }}
        actionRef={actionRef}
        // todo
        rowKey="id"
        request={params => query(params)}
        columns={columns}
        rowSelection={{}}
        toolBarRender={() => [
          <Button
            type="primary"
            onClick={() => {
              console.log('新建')
            }}
          >
            <PlusOutlined />
            新建
          </Button>,
        ]}
      />
    </div>
  );
};

// todo
function mapStateToProps({ loading }) {
  return {
    loading: loading.effects['']
  };
}

export default connect(mapStateToProps)(proTableTem);
