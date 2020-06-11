import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Card, Row, Col, message } from 'antd';
import {
  ReconciliationTwoTone,
  NotificationTwoTone
} from '@ant-design/icons'
import { Title, Notice } from '../../../component';
import './index.less';


import admin from '../../../api/admin';

class Home extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      noticeList: []
    }
  }

  componentDidMount() {
    this.getNotice();
  }

  getNotice = async () => {
    const res: any = await admin.listArticle({});
    if (!res.errCode) {
      this.setState({noticeList: res.data});
    } else {
      message.error(res.errMsg);
    }
  }

  render() {
    const { noticeList } = this.state;
    return (
      <>
        <Carousel autoplay>
          <img src='http://www.301hospital.mil.cn/images/banner2.jpg'></img>
          <img src='http://www.301hospital.mil.cn/images/banner1.jpg'></img>
        </Carousel>
        <div className='container'>
          <div className='cards'>
            <Link to={'/Patient/Register'}>
              <Card hoverable>
                <ReconciliationTwoTone style={{fontSize: 90, color: '#1890ff'}}></ReconciliationTwoTone>
                <div className='title'>预约挂号</div>
              </Card>
            </Link>
            <a href={'http://49.233.166.221:8090/'} target="_blank">
              <Card hoverable>
                <ReconciliationTwoTone style={{fontSize: 90, color: '#1890ff'}}></ReconciliationTwoTone>
                <div className='title'>在线咨询</div>
              </Card>
            </a>
            <Link to={'/Patient/NoticeList'}>
              <Card hoverable>
                <NotificationTwoTone style={{fontSize: 90, color: '#1890ff'}}></NotificationTwoTone>
                <div className='title'>医院公告</div>
              </Card>
            </Link>
          </div>
        </div>
        <div className='notice'>
          <div className='container'>
            <Title text='医院公告'></Title>
            <Row gutter={15} className='center'>
              <Col span={12}>
                <Carousel autoplay>
                  <img src='http://www.301hospital.mil.cn/images/img_kjqk.jpg'></img>
                  <img src='http://www.301hospital.mil.cn/images/img_yxky.jpg'></img>
                </Carousel>
              </Col>
              <Col span={12}>
                <Card hoverable style={{lineHeight: '18px'}}><Link to='/Patient/NoticeContent/4'>就医指南</Link></Card>
                <Card hoverable><Link to='/Patient/NoticeContent/4'>科室导航</Link></Card>
                <Card hoverable><Link to='/Patient/NoticeContent/4'>名医荟萃</Link></Card>
                <Card hoverable><Link to='/Patient/NoticeContent/4'>了解我们</Link></Card>
              </Col>
            </Row>
            {
              noticeList.map(function(item, index) {
                return (
                  <Notice key={index} data={item}></Notice>
                )
              })
            }
            <div className='footer'>
              <Link to={'/Patient/NoticeList'}>{'查看更多 >>'}</Link>
            </div>
          </div>
        </div>
      </>
    )
  }
};

export default Home;