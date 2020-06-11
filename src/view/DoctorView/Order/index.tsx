import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Card, Form, Input, message, Row, Col, Tag } from 'antd';
import { Title } from '../../../component';
import './index.less';

import doctor from '../../../api/doctor';

class Order extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
      select: 0
    }
  }

  componentDidMount() {
    this.isLog();
    this.getOrder({
      recordDate: '2020-06-05',
      doctorId: 10045
    });
  }

  isLog = () => {
    const { history, doctor } = this.props;

    if (!doctor.isLog) {
      history.push(`/Doctor/LoginAndReg`);
    }
  }

  getOrder = async (values) => {
    const res: any = await doctor.getOrder(values);
    if (!res.errCode) {
      this.setState({ order: res.data });
    } else {
      message.error(res.errMsg);
    }
  }

  onFinish = async values => {
    const { order, select} = this.state;
    const res: any = await doctor.updateRecord({
      recordId: order[select].recordId
    });
    const res1: any = await doctor.writeRecord({
      ...values,
      recordId: order[select].recordId,
      userId: order[select].userId,
      doctorId: order[select].doctorId
    });
    if (!res.errCode) {
      let newOrder = [...order];
      newOrder[select].recordStatus = '待评价';
      let newSelect = select+1;
      this.setState({select: newSelect})
    } else {
      message.error(res.errMsg);
    }
  }

  render() {
    const { order, select } = this.state;
    return (
      <div className='doctor-order'>
        <Title text='医生订单'></Title>
        <Row>
          <Col span={6}>
            {
              order.map((item, index) => {
                return (
                  <Card className='card' key={index} onClick={() => { this.setState({ select: index }) }}>
                    <Row>
                      <Col span={12}>
                        <p>患者：{item.userName}</p>
                      </Col>
                      <Col span={12}>
                        <p>性别：{item.userGender}</p>
                      </Col>
                      <Col span={12}>
                        <p>年龄：{item.userAge}</p>
                      </Col>
                      <Col span={12}>
                        <Tag color={item.recordStatus === '待就诊' ? "green" : 'gray'}>{item.recordStatus}</Tag>
                      </Col>
                    </Row>
                  </Card>
                )
              })
            }
          </Col>
          <Col span={18}>
            <Card
            title={`患者：${order[select] ? order[select].userName : '-'}`}
            extra={<span>{`当前排号 ${order[select] ? order[select].recordOrder : '-'}`}</span>}
            style={{height: '100%'}}
            >
              <Form
                name="doctorOrder"
                onFinish={this.onFinish}
              >
                <Form.Item
                  name="medicalRecord"
                  label="病情描述"
                  rules={[
                    {
                      required: true,
                      message: '请输入病情描述!',
                    },
                  ]}
                >
                  <Input.TextArea rows={6} />
                </Form.Item>
                <Form.Item>
                  <div className='footer'>
                    <Button type="primary" htmlType="submit">
                      下一个
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state: { doctor: any; }) => {
  return {
    doctor: state.doctor
  }
}

export default withRouter(
  connect(
    mapStateToProps
  )(Order));