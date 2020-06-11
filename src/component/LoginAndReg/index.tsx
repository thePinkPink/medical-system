import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Form, Input, Radio, message } from 'antd';
import Cookies from 'js-cookie';
import './index.less';

import patient from '../../api/patient';
import { userLogin } from '../../action/patient';

interface RegisterFormProps {
  changeLogin: () => void;
  onCancel: () => void;
}

interface LoginFormProps {
  changeLogin: () => void;
  onCancel: () => void;
  onLogin: (userInfo: any) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  changeLogin,
  onCancel
}) => {
  const [form] = Form.useForm();

  const onFinish = async values => {
    const res: any = await patient.register(values);
    if (!res.errCode) {
      message.success('注册成功！');
      changeLogin();
    } else {
      message.error(res.errMsg);
    }
  };

  const checkTel = async (rule, value, callback) => {
    const res: any = await patient.checkUserTelUnique({userTel: value});
    if (res.errCode) {
      callback('该手机号已注册');
    } else {
      callback();
    }
  }

  const sendCode = async (value) => {
    const res: any = await patient.sendCode({phone: value})
    if (!res.code) {
      message.success('验证码已发送');
    } else {
      message.error(res.errMsg);
    }
  }

  return (
    <Form
      form={form}
      layout="vertical"
      name="RegisterForm"
      onFinish={onFinish}
    >
      <Form.Item
        name="userName"
        label="用户名"
        rules={[{ required: true, message: '用户名不能为空' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="userPwd"
        label="密码"
        rules={[{ required: true, message: '密码不能为空' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item 
        name="userGender" 
        label='性别'
        rules={[{ required: true, message: '性别不能为空' }]}
      >
        <Radio.Group>
          <Radio value="女">女</Radio>
          <Radio value="男">男</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name="userTel"
        label="手机号"
        rules={[{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /^1[3456789]\d{9}$/,
          message: '手机号格式有误'
        }, {
          validator: checkTel
        }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="code"
        label={(
          <>
            <span>验证码</span>
            <Button type="link" onClick={() => sendCode(form.getFieldValue('userTel'))}>获取验证码</Button>
          </>
        )}
        rules={[{
          required: true,
          message: '验证码不能为空'
        }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <div style={{textAlign: 'center'}}>
          <Button type="link" onClick={changeLogin}>
            已有账号，去登录
          </Button>
        </div>
      </Form.Item>
      <Form.Item>
      <div style={{textAlign: 'center'}}>
        <Button type="primary" htmlType="submit">
          注册
        </Button>
      </div>
      </Form.Item>
    </Form>
  );
};

const LoginForm: React.FC<LoginFormProps> = ({
  changeLogin,
  onCancel,
  onLogin
}) => {
  const [form] = Form.useForm();

  const onFinish = async values => {
    const res: any = await patient.login(values);
    if (!res.data.errCode) {
      message.success('登录成功！');
      Cookies.set('patient_token', res.headers.authorization);
      onLogin({
        isLog: true, 
        userMsg: res.data.data
      });
      onCancel();
    } else {
      message.error(res.data.errMsg);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      name="LoginForm"
      onFinish={onFinish}
    >
      <Form.Item
        name="userTel"
        label="手机号"
        rules={[{ required: true, message: '手机号不能为空' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="userPwd"
        label="密码"
        rules={[{ required: true, message: '密码不能为空' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <div style={{textAlign: 'center'}}>
          <Button type="link" onClick={changeLogin}>
            没有账号，去注册
          </Button>
        </div>
      </Form.Item>
      <Form.Item>
      <div style={{textAlign: 'center'}}>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </div>
      </Form.Item>
    </Form>
  );
};

const LoginAndReg = (props: any) => {

  const [visible, setVisible] = useState(false);
  const [login, setLogin] = useState(true);

  const onCancel = () => {
    setVisible(false);
    setLogin(true);
  };

  return (
    <div className='login-and-reg'>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        登录
      </Button>
      <Modal
        visible={visible}
        title={login ? '登录' : '注册'}
        onCancel={onCancel}
        footer={null}
      >
        {
          login ? (
            <LoginForm
              changeLogin={() => setLogin(false)}
              onCancel={onCancel}
              onLogin={props.onLogin}
            />
          ) : (
              <RegisterForm
                changeLogin={() => setLogin(true)}
                onCancel={onCancel}
              />)
        }
      </Modal>
    </div>
  );
}

const mapStateToProps = (state: { patient: any; }) => {
  return {
      patient: state.patient
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (userInfo: any) => {
          dispatch(userLogin(userInfo))
        },
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginAndReg);