import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Avatar } from 'antd';
import { userLogout} from '../../action/patient';
import Cookies from 'js-cookie';

import './index.less';

class PersonalButton extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {}
  }

  loginOut = () => {
    this.props.onLogout({
      isLog: false,
      userMsg: {
        userAge: null,
        userAvatar: '',
        userGender: '',
        userName: '',
        userTel: ''
      }
    })
    Cookies.remove('patient_token');
  }

  render() {
    const { userMsg } = this.props.patient;
    
    return (
      <div className='personal-button'>
        <Link to='/Patient/Personal' className="avatar-item">
          <Avatar src={userMsg.userAvatar} />
        </Link>
        <div className='login-out' onClick={this.loginOut}>
          退出登录
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: { patient: any; }) => {
  return {
      patient: state.patient
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      onLogout: (userInfo: any) => {
        dispatch(userLogout(userInfo))
      },
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalButton);