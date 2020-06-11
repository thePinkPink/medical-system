import React from 'react';
import { Form, Select, Button, message } from 'antd';
import { Title } from '../../../component';
import DoctorList from './DoctorList/DoctorList';

import patient from '../../../api/patient';

import './index.less';

const { Option } = Select;

class Register extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      dep: [],
      doc: [],
      workDay: [{
        day: '2020-06-06',
        mean: '星期六'
      }, {
        day: '2020-06-07',
        mean: '星期天'
      }, {
        day: '2020-06-08',
        mean: '星期一'
      }, {
        day: '2020-06-09',
        mean: '星期二'
      }, {
        day: '2020-06-10',
        mean: '星期三'
      }, {
        day: '2020-06-11',
        mean: '星期四'
      }, {
        day: '2020-06-12',
        mean: '星期五'
      }],
      chooseDay: ''
    }
  }

  componentDidMount() {
    this.getDep();
  }

  getDep = async () => {
    const res: any = await patient.getDepartment({});
    if (!res.errCode) {
      this.setState({dep: res.data});
    } else {
      message.error(res.errMsg);
    }
  }

  onFinish = async values => {
    const res: any = await patient.choseDoctor(values);
    if (!res.errCode) {
      this.setState({
        doc: res.data,
        chooseDay: values.date
      });
    } else {
      message.error(res.errMsg);
    }
  };

  render() {
    const { workDay, dep, doc, chooseDay } = this.state;
    return (
      <div className='Register'>
        <Title text='预约挂号'></Title>
        <Form 
          name="RegisterForm" 
          layout="inline"
          onFinish={this.onFinish}
        >
          <Form.Item
            name="departmentName"
            label='科室'
            rules={[{ required: true, message: '请选择科室' }]}
            style={{width: '40%'}}
          >
            <Select placeholder="请选择科室">
              {
                dep.map((item, index) => {
                  return (
                    <Option key={index} value={item.departmentName}>{item.departmentName}</Option>
                  )
                })
              }
            </Select>
          </Form.Item>
          <Form.Item
            name="date"
            label='日期'
            rules={[{ required: true, message: '请选时间' }]}
            style={{width: '40%'}}
          >
            <Select placeholder="请选择工作日">
              {
                workDay.map((item, index) => {
                  return (
                    <Option key={index} value={item.day}>{item.mean}</Option>
                  )
                })
              }
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
            >
              查询
            </Button>
          </Form.Item>
        </Form>
        <DoctorList data={doc} chooseDay={chooseDay}></DoctorList>
      </div>
    );
  }
}

export default Register;