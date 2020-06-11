import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Layout, Menu, Button } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
} from '@ant-design/icons';

import AdminLogin from './AdminLogin';
import Department from './Department';
import Doctor from './Doctor';
import Notice from './Notice';
import Patient from './Patient';
import Schedule from './Schedule';

import { connect } from 'react-redux';
import { userLogout, userLogin } from '../../action/admin';

import './index.less';

const { Header, Content, Footer, Sider } = Layout;

class Admin extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      collapsed: false,
    };
    this.isLog();
  }

  isLog = () => {
    const { onLogin } = this.props;
    
    if (Cookies.get('admin_token')) {
      onLogin({
        isLog: true
      })
    }
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  loginOut = () => {
    this.props.onLogout({
      isLog: false,
      userMsg: {
        userName: '',
        userTel: ''
      }
    })
    Cookies.remove('admin_token');
    this.props.history.push('/Admin/AdminLogin');
  }

  render() {
    const { admin } = this.props;

    return (
      <Layout className='Admin' style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu 
            theme="dark" 
            defaultSelectedKeys={[this.props.location.pathname.split('/')[2]]} 
            mode="inline"
            key={this.props.location.pathname.split('/')[2]}
            onClick={(e: any) => {
              this.props.history.push(`/Admin/${e.key}`)
            }}
          >
            <Menu.Item key="Doctor" icon={<PieChartOutlined />}>
              医生管理
            </Menu.Item>
            <Menu.Item key="Department" icon={<DesktopOutlined />}>
              科室管理
            </Menu.Item>
            <Menu.Item key="Schedule" icon={<DesktopOutlined />}>
              排班管理
            </Menu.Item>
            <Menu.Item key="Notice" icon={<DesktopOutlined />}>
              公告管理
            </Menu.Item>
            <Menu.Item key="Patient" icon={<PieChartOutlined />}>
              用户管理
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} >
            {
              admin.isLog ? (
                <div className='header-right'>
                   <Button type='link' onClick={this.loginOut}>
                    退出登录
                   </Button>
                </div>
              ) : ''
            }
          </Header>
          <Content style={{ margin: '16px' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Switch>
                <Route exact path="/Admin/AdminLogin" component={AdminLogin} />
                <Route path="/Admin/Doctor" component={Doctor} />
                <Route path="/Admin/Department" component={Department} />
                <Route path="/Admin/Schedule" component={Schedule} />
                <Route path="/Admin/Notice" component={Notice} />
                <Route path="/Admin/Patient" component={Patient} />
                <Redirect to='/Admin/AdminLogin'></Redirect>
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
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
      onLogout: (userInfo: any) => {
          dispatch(userLogout(userInfo))
      },
  }
}

export default withRouter(
  connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin));