import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Select, message } from 'antd';
import admin from '../../../api/admin';

const { Option } = Select;

interface AddFormProps {
  onCancel: () => void;
  ajaxFun: (data, index, success) => void;
  index: number
}

const AddForm: React.FC<AddFormProps> = ({
  onCancel,
  ajaxFun,
  index = 0
}) => {
  const [form] = Form.useForm();

  const [dep, setDep] = useState([]);
  const [doc, setDoc] = useState([]);
  const [workDay] = useState([{
    day: 1,
    mean: '星期 1'
  }, {
    day: 2,
    mean: '星期 2'
  }, {
    day: 3,
    mean: '星期 3'
  }, {
    day: 4,
    mean: '星期 4'
  }, {
    day: 5,
    mean: '星期 5'
  }, {
    day: 6,
    mean: '星期 6'
  }, {
    day: 7,
    mean: '星期 7'
  }])

  useEffect(() => {
    getDep();
  }, []);

  const getDep = async () => {
    const res: any = await admin.getDepartment({});
    if (!res.errCode) {
      setDep(res.data);
    } else {
      message.error(res.errMsg);
    }
  }

  const getDoc = async (value) => {
    const res: any = await admin.getDoctorByDep({
      departmentName: value
    });
    if (!res.errCode) {
      setDoc(res.data);
    } else {
      message.error(res.errMsg);
    }
  }

  const onFinish = async values => {
    await ajaxFun(values, index, onCancel);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      name="AddForm"
      onFinish={onFinish}
    >
      <Form.Item
        name="departmentName"
        label="科室"
        rules={[{ required: true, message: '科室名不能为空' }]}
      >
        <Select placeholder="请选择科室" onChange={getDoc}>
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
        name="workday"
        label="工作日"
        rules={[{ required: true, message: '工作日能为空' }]}
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
      <Form.Item
        name="doctorId"
        label="医生"
        rules={[{ required: true, message: '医生不能为空' }]}
      >
        <Select placeholder="请选择医生">
          {
            doc.map((item, index) => {
              return (
                <Option key={index} value={item.doctorId}>{item.doctorName}</Option>
              )
            })
          }
        </Select>
      </Form.Item>
      <Form.Item>
      <div style={{textAlign: 'center'}}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </div>
      </Form.Item>
    </Form>
  );
};

const DepForm = (props: any) => {

  const [visible, setVisible] = useState(false);

  const { type, text, ajaxFun, index } = props;

  const onCancel = () => {
    setVisible(false);
  };

  return (
    <div className='login-and-reg'>
      <Button
        type={type}
        onClick={() => {
          setVisible(true);
        }}
      >
        {text}
      </Button>
      <Modal
        visible={visible}
        title={text}
        onCancel={onCancel}
        footer={null}
      >
        <AddForm
          onCancel={onCancel}
          ajaxFun={ajaxFun}
          index={index}
        />
      </Modal>
    </div>
  );
}

export default DepForm;