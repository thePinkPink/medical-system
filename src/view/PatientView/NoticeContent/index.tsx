import React from 'react';
import { withRouter } from 'react-router-dom';
import { message } from 'antd';
import './index.less';

import patient from '../../../api/patient';

class NoticeContent extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    }
    this.getNotice();
  }

  // componentDidMount() {
  //   this.getNotice();
  // }

  getNotice = async () => {
    // console.log(this.props.match.params.id);
    const res: any = await patient.getArticle({articleId: this.props.match.params.id});
    if (!res.errCode) {
      this.setState({data: res.data});
    } else {
      message.error(res.errMsg);
    }
  }

  render() {
    const { data } = this.state;
    return (
      <div className='NoticeContent'>
        <h1 className='title'>{data.articleTitle}</h1>
        <div className='other'>
          <div>时间：{data.articleCreateTime ? data.articleCreateTime.substring(0,10) : ''}</div>
          <div>作者：{data.articleAuthor}</div>
        </div>
        <div className='content' dangerouslySetInnerHTML={{__html: data.articleText}}></div>
      </div>
    );
  }
}

export default withRouter(NoticeContent);