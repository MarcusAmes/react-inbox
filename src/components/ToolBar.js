import React, { Component } from 'react';

class ToolBar extends Component{

  onButton = (str) => {
    this.props.onReadButton(str)
  }

  onCompose = () => {
    this.props.onCompose()
  }

  render() {

    const checkedMessages = this.props.messages.filter((message) => message.checked)
    const unreadMessages = this.props.messages.filter((message) => !message.read)
    let square = "fa-minus-square-o"
    if (checkedMessages.length === 0) {
      square = "fa-square-o"
    } else if (checkedMessages.length === this.props.messages.length) {
      square = "fa-check-square-o"
    }

    return (
      <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{unreadMessages.length}</span>
          unread messages
        </p>

        {!this.props.isCompose && <button onClick={this.onCompose} className="btn btn-danger">
          <i className="fa fa-plus"></i>
        </button>}

        <button className="btn btn-default">
          <i className={`fa ${square}`}></i>
        </button>

        <button onClick={() => this.onButton('read')} className="btn btn-default">
          Mark As Read
        </button>

        <button onClick={() => this.onButton('unread')} className="btn btn-default">
          Mark As Unread
        </button>

        <select className="form-control label-select">
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select">
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default">
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>

    )
  }
}

export default ToolBar;
