import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, message, Button } from 'antd';

import { Title } from '../../../component';

import admin from '../../../api/admin';

const columns = [
  {
    title: '姓名',
    dataIndex: 'doctorName',
    key: 'doctorName',
  },
  {
    title: '头像',
    dataIndex: 'doctorPhoto',
    key: 'doctorPhoto',
    render: (doctorPhoto) => {
      return (
        <img src={doctorPhoto} style={{width: '100px'}}></img>
      );
    }
  },
  {
    title: '科室',
    dataIndex: 'departmentName',
    key: 'departmentName',
  },
  {
    title: '性别',
    dataIndex: 'doctorGender',
    key: 'doctorGender',
    render: (doctorGender) => {
      return (
        <span>
          {
            doctorGender == 1 ? '男' : '女'
          }
        </span>
      )
    }
  },
  {
    title: '电话号',
    dataIndex: 'doctorTel',
    key: 'doctorTel',
  }
];

function Doctor (props: any) {

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
    const res: any = await admin.getAllDoctor({});
    if (!res.errCode) {
      console.log(res);
      setData(res.data);
    } else {
      message.error(res.errMsg);
    }
    setLoading(false);
  };

  const reviewDoctor = async (data) => {
    const res: any = await admin.review({
      tel: data
    });
    if (!res.errCode) {
      message.success('操作成功');
    } else {
      message.error(res.errMsg);
    }
  }

  const delDoctor = async (data) => {
    const res: any = await admin.deleteDoctor({
      tel: data
    });
    if (!res.errCode) {
      message.success('操作成功');
    } else {
      message.error(res.errMsg);
    }
  }

  return (
  <div>
    <Title text='医生管理'></Title>
    <Table 
      style={{marginTop: '20px'}}
      columns={[
        ...columns,
        {
          title: '操作',
          key: 'action',
          render: (text, record) => (
            <>
            <Button type='link' onClick={() => reviewDoctor(record.doctorTel)}>通过</Button>
            <Button type='link' onClick={() => delDoctor(record.doctorTel)}>未通过</Button>
            </>
          ),
        },
      ]} 
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
)(Doctor));