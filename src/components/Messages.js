import React, { Component } from 'react';
import Message from './Message'

class Messages extends Component{

  render() {
    const messageList = this.props.messages.map((message, idx) => <Message onMessageChange={this.props.onMessageChange} key={idx} message={message}/>)
    return (
      <div>
        {messageList}
      </div>
    )
  }
}

export default Messages;
