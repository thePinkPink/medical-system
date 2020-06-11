import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, message, Button } from 'antd';

import ScheduleForm from './ScheduleForm';
import { Title } from '../../../component';

import admin from '../../../api/admin';

const columns = [
  {
    title: 'Id',
    dataIndex: 'doctorId',
    key: 'doctorId',
  },
  {
    title: '科室名',
    dataIndex: 'departmentName',
    key: 'departmentName',
  },
  {
    title: '医生',
    dataIndex: 'doctorName',
    key: 'doctorName',
  },
  {
    title: '工作日',
    dataIndex: 'workday',
    key: 'workday',
    render: (text, record) => {
      return (
        <span>星期{record.workday}</span>
      )
    }
  },
];

function Schedule (props: any) {

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
    getSchedule();
  }, []);

  const getSchedule = async () => {
    setLoading(true);
    const res: any = await admin.getSchedule({});
    if (!res.errCode) {
      setData(res.data);
    } else {
      message.error(res.errMsg);
    }
    setLoading(false);
  };

  const addSchedule = async (data, index, success) => {
    console.log(data);
    const res: any = await admin.addSchedule(data);
    if (!res.errCode) {
      // let newData = [{
      //   departmentName: data.department_name,
      //   departmentPos: data.department_pos
      // }, ...depData];
      // setData(newData);
      getSchedule();
      message.success('操作成功');
      success();
    } else {
      message.error(res.errMsg);
    }
  }

  const delSchedule = async (data) => {
    const res: any = await admin.delSchedule(data);
    if (!res.errCode) {
      // let newData = [...depData];
      // newData = newData.filter(item => {
      //   return item.departmentName !== data.department_name
      // })
      // setData(newData);
      getSchedule();
      message.success('操作成功');
    } else {
      message.error(res.errMsg);
    }
  }

  return (
  <div>
    <Title text='排班管理'></Title>
    <ScheduleForm type='primary' text='新增排班' ajaxFun={addSchedule}></ScheduleForm>
    <Table 
      style={{marginTop: '20px'}}
      columns={[
        ...columns,
        {
          title: '操作',
          key: 'action',
          render: (text, record, index) => (
            <>
            <Button type='link' onClick={() => delSchedule(record)}>删除</Button>
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
)(Schedule));