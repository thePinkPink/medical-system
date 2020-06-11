import React, { useState } from 'react';
import { Button, Modal, Form, Select, message, Input } from 'antd';
import Editor from 'for-editor'
import admin from '../../../api/admin';

const { Option } = Select;


const mditor = require("mditor");

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

  const [value, setValue] = useState<any>('');
  const [html, setHtml] = useState<any>('');

  const updateMarkdown = (value) => {  
    var parser = new mditor.Parser(); 
    var html = parser.parse(value);  
    setValue(value);
    setHtml(html);
    console.log('handleEditorChange', value, html)
  }

  const onFinish = async values => {
    await ajaxFun({...values, articleText: html}, index, onCancel);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      name="AddForm"
      onFinish={onFinish}
    >
      <Form.Item
        name="articleTitle"
        label="标题"
        rules={[{ required: true, message: '标题不能为空' }]}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        name="articleAuthor"
        label="作者"
        rules={[{ required: true, message: '作者不能为空' }]}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        name="articleAbbr"
        label="简介"
        rules={[{ required: true, message: '简介不能为空' }]}
      >
        <Input.TextArea></Input.TextArea>
      </Form.Item>
      <Editor value={value} onChange={(e) => updateMarkdown(e)} />
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

const NoticeForm = (props: any) => {

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
        width={'80%'}
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

export default NoticeForm;