import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, message, Button } from 'antd';

import NoticeForm from './NoticeForm';
import { Title } from '../../../component';

import admin from '../../../api/admin';

const columns = [
  {
    title: 'Id',
    dataIndex: 'articleId',
    key: 'articleId',
  },
  {
    title: '标题',
    dataIndex: 'articleTitle',
    key: 'articleTitle',
  },
  {
    title: '作者',
    dataIndex: 'articleAuthor',
    key: 'articleAuthor'
  },
  {
    title: '简介',
    dataIndex: 'articleAbbr',
    key: 'articleAbbr',
  },
];

function Notice (props: any) {

  const [depData, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    isLog();
  }, []);

  const isLog = () => {
    const { history, admin } = props;
    
    if (!admin.isLog) {
      history.push(`/Admin/AdminLogin`);
    }
  }

  useEffect(() => {
    isLog();
    getNotice();
  }, []);

  const getNotice = async () => {
    setLoading(true);
    const res: any = await admin.listArticle({});
    if (!res.errCode) {
      setData(res.data);
    } else {
      message.error(res.errMsg);
    }
    setLoading(false);
  };

  const addNotice = async (data, index, success) => {
    console.log(data);
    const res: any = await admin.addArticle(data);
    if (!res.errCode) {
      // let newData = [{
      //   departmentName: data.department_name,
      //   departmentPos: data.department_pos
      // }, ...depData];
      // setData(newData);
      getNotice();
      message.success('操作成功');
      success();
    } else {
      message.error(res.errMsg);
    }
  }

  const delNotice = async (data) => {
    const res: any = await admin.delArticle(data);
    if (!res.errCode) {
      getNotice();
      message.success('操作成功');
    } else {
      message.error(res.errMsg);
    }
  }

  return (
  <div>
    <Title text='公告管理'></Title>
    <NoticeForm type='primary' text='新增公告' ajaxFun={addNotice}></NoticeForm>
    <Table 
      style={{marginTop: '20px'}}
      columns={[
        ...columns,
        {
          title: '操作',
          key: 'action',
          render: (text, record, index) => (
            <>
              <Button type='link' onClick={() => delNotice({articleId: record.articleId})}>删除</Button>
            </>
          ),
        },
      ]} 
      dataSource={depData} 
      bordered={true}
      pagination={false}
      loading={loading}
    />
  </div>
  )
}

const mapStateToProps = (state: { admin: any; }) => {
  return {
      admin: state.admin
  }
}

export default withRouter(
  connect(
  mapStateToProps,
)(Notice));