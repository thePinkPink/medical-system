import React from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Input,
  Button,
  message
} from 'antd';
import { Title } from '../../../../component';
import './index.less';
import patient from '../../../../api/patient';
import { updateUser } from '../../../../action/patient';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};

class ChangePwd extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {}
  }

  onFinish = async values => {
    const res: any = await patient.updateUser(values);
    const { updateUser, userMsg } = this.props;
    if (!res.errCode) {
      updateUser({
        ...userMsg,
        ...values
      })
      message.success('修改成功');
    } else {
      message.error(res.errMsg);
    }
  };

  render() {
    return (
      <div className='ChangePwd'>
        <Title text='修改密码'></Title>
        <Form
          name="validate_other"
          {...formItemLayout}
          onFinish={this.onFinish}
        >

          <Form.Item
            name='oldPwd'
            label="旧密码"
            rules={[{ required: true, message: '请输入旧密码' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name='newPwd'
            label="新密码"
            rules={[{ required: true, message: '请输入新密码' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <div style={{textAlign: 'center', width: '100%'}}>
              <Button type="primary" htmlType="submit">
                修改
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    )
  };
}

const mapStateToProps = (state: { patient: any; }) => {
  return {
      patient: state.patient
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      updateUser: (userInfo: any) => {
        dispatch(updateUser(userInfo))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePwd);