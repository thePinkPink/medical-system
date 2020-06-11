import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import { Layout, Menu, message } from 'antd';
import './index.less';

import Home from './Home';
import NoticeList from './NoticeList';
import NoticeContent from './NoticeContent';
import Personal from './Personal';
import Register from './Register';
import { LoginAndReg, PersonalButton } from '../../component';

import { userLogin } from '../../action/patient';
import patient from '../../api/patient';

const { Header, Content, Footer } = Layout;

class Patient extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            key: 'Home'
        }
        if (Cookies.get('patient_token')) {
            this.getUserInfo();
        }
    }

    componentDidMount () {
        this.getUserInfo();
    }

    async getUserInfo () {
        const res: any = await patient.getUserInfo(); 
        if (!res.errCode) {
            this.props.onLogin({
                isLog: true, 
                userMsg: res.data
            })
        } else {
            message.error(res.errMsg);
        }
    }

    render() {
        const { key } = this.state;
        const { isLog } = this.props.patient;

        return (
            <Layout className="layout">
                <Header>
                    <div className="logo"></div>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={[this.props.location.pathname.split('/')[2]]}
                        key={this.props.location.pathname.split('/')[2]}
                        onClick={(e: any) => {
                            this.props.history.push(`/Patient/${e.key}`)
                        }}
                    >
                        <Menu.Item key="Home">首页</Menu.Item>
                        <Menu.Item key="NoticeList">医疗文章</Menu.Item>
                        <Menu.Item key="Register">预约挂号</Menu.Item>
                        <div className='header-right'>
                            {
                                isLog ? (
                                    <PersonalButton></PersonalButton>
                                ) : (
                                        <LoginAndReg></LoginAndReg>
                                    )
                            }
                        </div>
                    </Menu>
                </Header>
                <Content>
                    <div className="site-layout-content">
                        <Switch>
                            <Route exact path="/Patient/Home" component={Home} />
                            <Route path="/Patient/NoticeList" component={NoticeList} />
                            <Route path="/Patient/NoticeContent/:id" component={NoticeContent} />
                            <Route path="/Patient/Personal" component={Personal} />
                            <Route path="/Patient/Register" component={Register} />
                            <Redirect to='/Patient/Home'></Redirect>
                        </Switch>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        )
    }
};

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

export default withRouter(
    connect(
    mapStateToProps,
    mapDispatchToProps
)(Patient));