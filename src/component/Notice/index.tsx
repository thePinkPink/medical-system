import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'antd';
import './index.less';

import {
  NotificationTwoTone
} from '@ant-design/icons';

class Notice extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const {data} = this.props;
    return (
      <Link to={`/Patient/NoticeContent/${data.articleId}`}>
        <Card hoverable className='Notice'>
          <Row>
            <Col span={1}>
              <NotificationTwoTone style={{fontSize: '32px', marginTop: '6px'}} />
            </Col>
            <Col span={23}>
              <div className='title'>{data.articleTitle}</div>
              <div className='summary'>{data.articleAbbr}</div>
            </Col>
          </Row>
        </Card>
      </Link>
    );
  }
}

export default Notice;