import React, { Component } from 'react';
import Label from './Label'

class Message extends Component{

  state = {
    more: false
  }

  onChange = (key, messageId) => {
    this.props.onMessageChange(key, messageId)
  }

  onMore = () => {
    this.setState(({more}) => ({more: !more}))
  }

  render() {
    const { subject, read, starred, labels, id, checked, body } = this.props.message
    const label = labels.map((indLabel, idx) => <Label key={idx} label={indLabel}/>)

    return (
      <>
        <div className={`row message ${read ? "read " : "unread "} ${checked ? "selected" : ""}`} >
          <div className="col-xs-1">
            <div className="row">
              <div className="col-xs-2">
                <input checked={checked} name="checked" onChange={() => this.onChange('checked', id)} type="checkbox"/>
              </div>
              <div className="col-xs-2">
                <i onClick={() => this.onChange('starred', id)} name="starred" className={`star fa ${starred ? "fa-star" : "fa-star-o"}`}></i>
              </div>
            </div>
          </div>
          <div onClick={this.onMore} className="col-xs-11">
            {label}
            <span>
              {subject}
            </span>
          </div>
        </div>
        {this.state.more && <div className="row message-body">
          <div className="col-xs-11 col-xs-offset-1">
            {body}
          </div>
        </div>}
      </>
    )
  }
}

export default Message;
