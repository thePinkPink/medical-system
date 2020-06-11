import React from 'react';
import './index.less';

class Personal extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className='doctor-personal'>
        医生个人中心
      </div>
    );
  }
}

export default Personal;