import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import { Layout, Menu, Button } from 'antd';
import './index.less';

import LoginAndReg from './LoginAndReg';
import Order from './Order';
import Personal from './Personal';

import { userLogin, userLogout } from '../../action/doctor';
import doctor from '../../api/doctor';

const { Header, Content, Footer } = Layout;

class Doctor extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            key: 'Home'
        }
        this.isLog()
    }

    isLog = () => {
        const { onLogin } = this.props;
        
        if (Cookies.get('doctor_token')) {
          onLogin({
            isLog: true
          })
        }
    }

    loginOut = () => {
        this.props.onLogout({
          isLog: false,
          userMsg: {
            userName: '',
            userTel: ''
          }
        })
        Cookies.remove('doctor_token');
        this.props.history.push('/Doctor/LoginAndReg');
      }

    render() {
        const { key } = this.state;
        const { isLog } = this.props.doctor;

        console.log(this.props.doctor);

        return (
            <Layout className="doctor">
                <Header>
                    <div className="logo"></div>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={[key]}
                        key={this.props.location.pathname.split('/')[1]}
                        onClick={(e: any) => {
                            this.props.history.push(`/Doctor/${e.key}`)
                        }}
                    >
                        <Menu.Item key="Order"></Menu.Item>
                        {/* <Menu.Item key="Personal">个人中心</Menu.Item> */}
                        <div className='header-right'>
                        {
                            isLog ? (
                                <div className='header-right'>
                                <Button type='link' onClick={this.loginOut}>
                                    退出登录
                                </Button>
                                </div>
                            ) : ''
                        }
                        </div>
                    </Menu>
                </Header>
                <Content>
                    <div className="site-layout-content">
                        <Switch>
                            <Route exact path="/Doctor/LoginAndReg" component={LoginAndReg} />
                            <Route path="/Doctor/Order" component={Order} />
                            <Redirect to='/Doctor/LoginAndReg'></Redirect>
                        </Switch>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        )
    }
};

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
        onLogout: (userInfo: any) => {
            dispatch(userLogout(userInfo))
        },
    }
}

export default withRouter(
    connect(
    mapStateToProps,
    mapDispatchToProps
)(Doctor));