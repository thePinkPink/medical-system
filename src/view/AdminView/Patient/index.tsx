import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, message } from 'antd';

import { Title } from '../../../component';

import admin from '../../../api/admin';

const columns = [
  {
    title: 'Id',
    dataIndex: 'userId',
    key: 'userId',
  },
  {
    title: '头像',
    dataIndex: 'userAvatar',
    key: 'userAvatar',
    render: (userAvatar) => {
      return (
        <img src={userAvatar} style={{width: '100px'}}></img>
      );
    }
  },
  {
    title: '用户名',
    dataIndex: 'userName',
    key: 'userName',
  },
  {
    title: '年龄',
    dataIndex: 'userAge',
    key: 'userAge',
  },
  {
    title: '性别',
    dataIndex: 'userGender',
    key: 'userGender',
  },
  {
    title: '电话号',
    dataIndex: 'userTel',
    key: 'userTel',
  }
];

function Patient (props: any) {

  const [data, setData] = useState([]);
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
    getAllUser();
  }, []);

  const getAllUser = async () => {
    setLoading(true);
    const res: any = await admin.getAllUser({});
    if (!res.errCode) {
      console.log(res);
      setData(res.data);
    } else {
      message.error(res.errMsg);
    }
    setLoading(false);
  };

  return (
  <div>
    <Title text='用户管理'></Title>
    <Table 
      style={{marginTop: '20px'}}
      columns={columns} 
      dataSource={data} 
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
)(Patient));