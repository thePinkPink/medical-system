import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, message, Button } from 'antd';

import DepForm from './DepForm';
import { Title } from '../../../component';

import admin from '../../../api/admin';

const columns = [
  {
    title: '科室名',
    dataIndex: 'departmentName',
    key: 'departmentName',
  },
  {
    title: '地址',
    dataIndex: 'departmentPos',
    key: 'departmentPos',
  },
];

function Department (props: any) {

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
    getDepartment();
  }, []);

  const getDepartment = async () => {
    setLoading(true);
    const res: any = await admin.getDepartment({});
    if (!res.errCode) {
      setData(res.data);
    } else {
      message.error(res.errMsg);
    }
    setLoading(false);
  };

  const addDep = async (data, index, success) => {
    const res: any = await admin.addDepartment(data);
    if (!res.errCode) {
      let newData = [
        ...depData, {
        departmentName: data.department_name,
        departmentPos: data.department_pos
      }];
      setData(newData);
      message.success('操作成功');
      success();
    } else {
      message.error(res.errMsg);
    }
  }

  const changeDep = async (data, index, success) => {
    const res: any = await admin.changeDepartment(data);
    if (!res.errCode) {
      let newData = [...depData];
      newData[index] = {
        departmentName: data.department_name,
        departmentPos: data.department_pos
      };
      setData(newData);
      message.success('操作成功');
      success();
    } else {
      message.error(res.errMsg);
    }
  }

  const delDep = async (data) => {
    const res: any = await admin.delDepartment(data);
    if (!res.errCode) {
      let newData = [...depData];
      newData = newData.filter(item => {
        return item.departmentName !== data.department_name
      })
      setData(newData);
      message.success('操作成功');
    } else {
      message.error(res.errMsg);
    }
  }

  return (
  <div>
    <Title text='科室管理'></Title>
    <DepForm type='primary' text='新增科室' ajaxFun={addDep}></DepForm>
    <Table 
      style={{marginTop: '20px'}}
      columns={[
        ...columns,
        {
          title: '操作',
          key: 'action',
          render: (text, record, index) => (
            <>
            <DepForm type='link' text='修改' itemData={record} index={index} ajaxFun={changeDep}></DepForm>
            <Button type='link' onClick={() => delDep({department_name: record.departmentName})}>删除</Button>
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
)(Department));