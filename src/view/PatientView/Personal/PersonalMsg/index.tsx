import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import jsCookie from 'js-cookie';
import {
  Form,
  Input,
  Button,
  Upload,
  Radio,
  message,
} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Title } from '../../../../component';
import './index.less';
import patient from '../../../../api/patient';
import { updateUser, updateAvatar } from '../../../../action/patient';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};

class PersonalMsg extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    const { userMsg } = this.props.patient;
    this.setState({img: userMsg.userAvatar})
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
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

  checkTel = async (rule, value, callback) => {
    const res: any = await patient.checkUserTelUnique({userTel: value});
    if (res.errCode) {
      callback('该手机号已注册');
    } else {
      callback();
    }
  }

  handleChange = info => {
    const { updateUser, userMsg } = this.props;

    if (info.file.status === 'done') {
      console.log("done");
      this.getBase64(info.file.originFileObj, imageUrl =>{
        console.log(imageUrl);
        this.setState({img: imageUrl})
        updateUser({
          ...userMsg,
          userAvatar: imageUrl
        })}
      );
    }
  }

  render() {
    const { userMsg } = this.props.patient;

    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <div className='PersonalMsg'>
        <Title text='个人中心'></Title>
        <Form
          name="validate_other"
          {...formItemLayout}
          onFinish={this.onFinish}
        >
          <Form.Item label="头像">
            <Upload
              name="avatarFile"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="http://49.233.166.221:8080/xuptcd/user/newAvatar"
              headers = {{
                Authorization: `${jsCookie.get('patient_token')}`
              }}
              onChange={this.handleChange}
              key={userMsg.userAvatar}
            >
              {this.state.img? <img src={this.state.img} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
          </Form.Item>

          <Form.Item
            label="用户名"
          >
            <span className="ant-form-text">{userMsg.userName}</span>
          </Form.Item>

          <Form.Item 
            name="userGender" 
            label="性别"
            rules={[{ required: true, message: '请选择性别' }]}
            initialValue={userMsg.userGender}
          >
            <Radio.Group>
              <Radio value="男">男</Radio>
              <Radio value="女">女</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name='userAge'
            label="年龄"
            initialValue={userMsg.userAge}
          >
            <Input type='number'></Input>
          </Form.Item>

          <Form.Item
            name="userTel"
            label="手机号"
            initialValue={userMsg.userTel}
            rules={[{
              required: true,
              message: '手机号不能为空'
            }, {
              pattern: /^1[3456789]\d{9}$/,
              message: '手机号格式有误'
            }, {
              validator: this.checkTel,
              message: '手机号已注册'
            }]}
          >
            <Input></Input>
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
      updateAvatar: (userInfo: any) => {
          dispatch(updateAvatar(userInfo))
      },
      updateUser: (userInfo: any) => {
        dispatch(updateUser(userInfo))
    },
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalMsg));