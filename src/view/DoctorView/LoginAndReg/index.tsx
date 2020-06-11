import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Form, Input, Button, message, Radio } from 'antd';
import Cookies from 'js-cookie';


import { connect } from 'react-redux';
import { userLogin } from '../../../action/doctor';
import doctor from '../../../api/doctor';

interface RegisterFormProps {
  changeLogin: () => void;
}

interface LoginFormProps {
  changeLogin: () => void;
  onLogin: (userInfo: any) => void;
  history: any
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  changeLogin
}) => {
  const [form] = Form.useForm();

  const onFinish = async values => {
    const res: any = await doctor.register(values);
    if (!res.errCode) {
      message.success('注册成功！');
      changeLogin();
    } else {
      message.error(res.errMsg);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      name="RegisterForm"
      onFinish={onFinish}
    >
      <Form.Item
        name="doctorName"
        label="姓名"
        rules={[{ required: true, message: '姓名不能为空' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="doctorPwd"
        label="密码"
        rules={[{ required: true, message: '密码不能为空' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item 
        name="doctorGender" 
        label='性别'
        rules={[{ required: true, message: '性别不能为空' }]}
      >
        <Radio.Group>
          <Radio value="0">女</Radio>
          <Radio value="1">男</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name="departmentName"
        label="科室名"
        rules={[{ required: true, message: '科室名不能为空' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="doctorTitle"
        label="职称"
        rules={[{ required: true, message: '职称不能为空' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="doctorTel"
        label="手机号"
        rules={[{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /^1[3456789]\d{9}$/,
          message: '手机号格式有误'
        }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="doctorInfo"
        label="简介"
        rules={[{ required: true, message: '简介不能为空' }]}
      >
        <Input.TextArea />
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
  onLogin,
  history
}) => {
  const [form] = Form.useForm();

  const onFinish = async values => {
    const res: any = await doctor.login(values);
    if (!res.data.errCode) {
      message.success('登录成功！');
      Cookies.set('doctor_token', res.headers.authorization);
      onLogin({
        isLog: true, 
        userMsg: res.data.data
      });
      history.push(`/Doctor/Order`);
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
        name="doctorTel"
        label="手机号"
        rules={[{ required: true, message: '手机号不能为空' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="doctorPwd"
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

class LoginAndReg extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      log: true
    }
  }

  componentDidMount() {
    this.isLog();
  }

  isLog = () => {
    const { doctor, history } = this.props;
    
    if (doctor.isLog) {
      history.push(`/Doctor/Order`);
    }
  }

  render() {
    const { log } = this.state;
    const { onLogin, history } = this.props;

    return (
      <div className='doctor-login' style={{padding: '50px 0', minHeight: '800px'}}>
        <Card style={{width: '50%', margin: '0 auto'}}>
          {
            log ? (
              <LoginForm changeLogin={() => this.setState({log: false})} onLogin={onLogin} history={history}></LoginForm>
            ) : 
            (
              <RegisterForm changeLogin={() => this.setState({log: true})}></RegisterForm>
            )
          }
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state: { doctor: any; }) => {
  return {
      doctor: state.doctor
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      onLogin: (userInfo: any) => {
          dispatch(userLogin(userInfo))
      },
  }
}

export default withRouter(
  connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginAndReg));