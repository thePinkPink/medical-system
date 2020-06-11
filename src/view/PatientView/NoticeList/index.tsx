import React from 'react';
import { message } from 'antd';
import { Notice } from '../../../component';
import './index.less';

import admin from '../../../api/admin';

class NoticeList extends React.Component<any, any> {
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
      <div className='NoticeList'>
        <div className='header'>医疗公告</div>
        {
          noticeList.map((item, index) => <Notice key={index} data={item}></Notice>)
        }
      </div>
    );
  }
}

export default NoticeList;