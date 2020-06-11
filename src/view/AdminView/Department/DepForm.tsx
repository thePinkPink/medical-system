import React, { useState } from 'react';
import { Button, Modal, Form, Input} from 'antd';

interface AddFormProps {
  onCancel: () => void;
  ajaxFun: (data, index, success) => void;
  itemData: any;
  index: number
}

const AddForm: React.FC<AddFormProps> = ({
  onCancel,
  ajaxFun,
  itemData,
  index = 0
}) => {
  const [form] = Form.useForm();

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
        name="department_name"
        label="科室名"
        rules={[{ required: true, message: '科室名不能为空' }]}
        initialValue={itemData && itemData.departmentName ? itemData.departmentName : ''}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="department_pos"
        label="科室位置"
        rules={[{ required: true, message: '科室位置不能为空' }]}
        initialValue={itemData && itemData.departmentPos ? itemData.departmentPos : ''}
      >
        <Input />
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

  const { type, text, ajaxFun, itemData, index } = props;

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
          itemData={itemData}
          index={index}
        />
      </Modal>
    </div>
  );
}

export default DepForm;