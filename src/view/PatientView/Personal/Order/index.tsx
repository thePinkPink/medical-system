import React from 'react';
import { Card, message, Row, Col, Form, Modal, Input, Button, Rate } from 'antd';
import { EditOutlined, EllipsisOutlined, DeleteOutlined } from '@ant-design/icons';
import './index.less';

import patient from '../../../../api/patient';

class Order extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
      visible: false,
      visibleAll: false,
      id: '',
      comment: {},
      data: {}
    }
  }

  componentDidMount() {
    this.getOrder();
  }

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  handleCancelAll = e => {
    this.setState({
      visibleAll: false,
    });
  };

  openAll = async (record) => {
    const res: any = await patient.getComment({ recordId: record.recordId });
    if (!res.errCode) {
      this.setState({
        comment: res.data,
        visibleAll: true,
        id: record.recordId,
        data: record
      })
    } else {
      message.error(res.errMsg);
    }
  }

  getOrder = async () => {
    const res: any = await patient.listRecord({
      size: 10,
      p: 1
    });
    if (!res.errCode) {
      this.setState({
        order: res.data.list
      })
    } else {
      message.error(res.errMsg);
    }
  }

  delOrder = async (data) => {
    const res: any = await patient.delRecord(data);
    if (!res.errCode) {
      message.success('删除成功');
      let newData = [...this.state.order];
      newData = newData.filter(item => {
        return item.recordId !== data.recordId
      })
      this.setState({ order: newData });
    } else {
      message.error(res.errMsg);
    }
  }

  onFinish = async values => {
    const res: any = await patient.commentRecord({ ...values, recordId: this.state.id });
    if (!res.errCode) {
      message.success('评价成功！');
      this.getOrder();
      this.setState({ visible: false });
    } else {
      message.error(res.errMsg);
    }
  };

  render() {
    const { order, data, comment } = this.state;
    return (
      <div className='Order'>
        {
          order.map((item, index) => {
            return (
              <Card
                key={index}
                hoverable
                title={`订单号：${item.recordId}`}
                extra={item.recordCreateTime.substring(0,10)}
                actions={[
                  <DeleteOutlined onClick={() => this.delOrder({ recordId: item.recordId })} />,
                  <EditOutlined key="edit" onClick={() => this.setState({ visible: true, id: item.recordId })} />,
                  <EllipsisOutlined key="ellipsis" onClick={() => this.openAll(item)} />,
                ]}
              >
                <Row>
                  <Col span={12}>
                    <p>我的医生：{item.doctorName}</p>
                  </Col>
                  <Col span={12}>
                    <p>科室：{`${item.departmentName}(${item.departmentPos})`}</p>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <p>
                      就诊日期：{item.recordDate}
                      <span>
                        {
                          item.recordTime ? ' 下午' : ' 上午'
                        }
                      </span>
                    </p>
                  </Col>
                  <Col span={12}>
                    <p>就诊序号：{item.recordOrder ? item.recordOrder : '-'}</p>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <p>费用：{item.recordFare} 元</p>
                  </Col>
                  <Col span={12}>
                    <p>状态：{item.recordStatus ? item.recordStatus : '-'}</p>
                  </Col>
                </Row>
              </Card>
            )
          })
        }
        <Modal
          title="评分"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Form
            layout="vertical"
            name="LoginForm"
            onFinish={this.onFinish}
          >
            <Form.Item
              name="feedbackRating"
              label="评分"
              rules={[{ required: true, message: '评分不能为空' }]}
            >
              <Rate />
            </Form.Item>
            <Form.Item
              name="feedbackInfo"
              label="评价"
              rules={[{ required: true, message: '评价不能为空' }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <div style={{ textAlign: 'center' }}>
                <Button type="primary" htmlType="submit">
                  评价
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="详情"
          visible={this.state.visibleAll}
          onCancel={this.handleCancelAll}
          footer={null}
        >
          <Row>
            <Col span={12}>
              <p>我的医生：{data.doctorName}</p>
            </Col>
            <Col span={12}>
              <p>科室：{`${data.departmentName}(${data.departmentPos})`}</p>
            </Col>
            <Col span={12}>
              <p>
                就诊日期：{data.recordDate}
                <span>
                  {
                    data.recordTime ? ' 下午' : ' 上午'
                  }
                </span>
              </p>
            </Col>
            <Col span={12}>
              <p>就诊序号：{data.recordOrder ? data.recordOrder : '-'}</p>
            </Col>
            <Col span={24}>
              <p>诊断结果：{data.medicalRecord ? data.medicalRecord : '-'}</p>
            </Col>
            <Col span={24}>
              <p>我的评价：{comment.feedbackInfo ? comment.feedbackInfo : '-'}</p>
            </Col>
            <Col span={12}>
              <p>费用：{data.recordFare} 元</p>
            </Col>
            <Col span={12}>
              <p>状态：{data.recordStatus ? data.recordStatus : '-'}</p>
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

export default Order;