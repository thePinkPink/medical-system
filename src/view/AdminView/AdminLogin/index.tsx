import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Form, Input, Button, message } from 'antd';
import Cookies from 'js-cookie';


import { connect } from 'react-redux';
import { userLogin } from '../../../action/admin';
import admin from '../../../api/admin';

class AdminLogin extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.isLog();
  }

  isLog = () => {
    const { admin, history } = this.props;
    
    if (admin.isLog) {
      history.push(`/Admin/Doctor`);
    }
  }

  onFinish = async (values) => {
    const { onLogin } = this.props;
    
    const res: any = await admin.login(values);
    if (!res.data.errCode) {
      message.success('登录成功！');
      Cookies.set('admin_token', res.headers.authorization);
      onLogin({
        isLog: true, 
        userMsg: res.data.data
      });
      this.props.history.push('/Admin/Doctor');
    } else {
      message.error(res.data.errMsg);
    }
  }

  render() {
    return (
      <div className='admin-login' style={{minHeight: '750px', padding: '100px 0'}}>
        <Card style={{width: "50%", margin: '0 auto'}}>
          <Form
            layout="vertical"
            name="LoginForm"
            onFinish={this.onFinish}
          >
            <Form.Item
              name="adminName"
              label="用户名"
              rules={[{ required: true, message: '用户名不能为空' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="adminPwd"
              label="密码"
              rules={[{ required: true, message: '密码不能为空' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
            <div style={{textAlign: 'center'}}>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
            </div>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state: { admin: any; }) => {
  return {
      admin: state.admin
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
)(AdminLogin));