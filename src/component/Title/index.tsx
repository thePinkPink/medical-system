import React from 'react';
import './index.less';

class Title extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { text } = this.props;
    return (
      <div className='titleC'>
        <div className='title'>{text}</div>
      </div>
    );
  }
}

export default Title;