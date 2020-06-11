import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Row, Col, Avatar } from 'antd';

import './index.less';

import Order from './Order';
import PersonalMsg from './PersonalMsg';
import ChangePwd from './ChangePwd';

class Personal extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      key: 'PersonalMsg'
    }
  }

  render() {
    const { key } = this.state;
    const { userMsg } = this.props.patient;
    return (
      <div className='Personal'>
        <Row gutter={20} style={{backgroundColor: '#fff'}}>
          <Col span={4} className='left'>
            <Avatar size={82} src={userMsg.userAvatar}></Avatar>
            <Menu 
              theme="light" 
              mode="inline" 
              defaultSelectedKeys={[this.props.location.pathname.split('/')[3]]}
              key = {this.props.location.pathname.split('/')[3]}
              onClick={(e: any) => {
                this.props.history.push(`/Patient/Personal/${e.key}`)
              }}
            >
              <Menu.Item key="PersonalMsg">个人信息</Menu.Item>
              <Menu.Item key="Order">我的订单</Menu.Item>
              <Menu.Item key="ChangePwd">修改密码</Menu.Item>
            </Menu>
          </Col>
          <Col span={20}>
            <Switch>
              <Route exact path="/Patient/Personal/PersonalMsg" component={PersonalMsg}/>
              <Route path="/Patient/Personal/Order" component={Order}/>
              <Route path="/Patient/Personal/ChangePwd" component={ChangePwd}/>
              <Redirect to='/Patient/Personal/PersonalMsg'></Redirect>
            </Switch>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state: { patient: any; }) => {
  return {
      patient: state.patient
  }
}

export default withRouter(
  connect(
  mapStateToProps
)(Personal));