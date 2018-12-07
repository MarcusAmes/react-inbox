import React, { Component } from 'react';

class ToolBar extends Component{

  state = {
    labelDefault: ""
  }

  onButton = (str) => {
    this.props.onReadButton(str)
  }

  onCompose = () => {
    this.props.onCompose()
  }

  onMarkBulk = (isAllSelected) => {
    this.props.onMarkBulk(isAllSelected)
  }

  onDeleteClick = () => {
    this.props.onDeleteClick()
  }

  onLabelAdd = (e) => {
    this.props.onLabelAdd(e.target.value)
    this.setState({labelDefault: ""})
  }

  onLabelRemove = (e) => {
    this.props.onLabelRemove(e.target.value)
    this.setState({labelDefault: ""})
  }

  render() {

    const checkedMessages = this.props.messages.filter((message) => message.checked)
    const unreadMessages = this.props.messages.filter((message) => !message.read)
    let square = "fa-minus-square-o"
    let isAllSelected = false;
    if (checkedMessages.length === 0) {
      square = "fa-square-o"
    } else if (checkedMessages.length === this.props.messages.length) {
      isAllSelected = true;
      square = "fa-check-square-o"
    }
    let unreadMessage = "unread messages"
    if(unreadMessages.length === 1){
      unreadMessage = "unread message"
    }

    return (
      <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{unreadMessages.length}</span>
          {unreadMessage}
        </p>

        {!this.props.isCompose && <button onClick={this.onCompose} className="btn btn-danger">
          <i className="fa fa-plus"></i>
        </button>}

        <button onClick={() => this.onMarkBulk(isAllSelected)} className="btn btn-default">
          <i className={`fa ${square}`}></i>
        </button>

        <button onClick={() => this.onButton('read')} className="btn btn-default" disabled={checkedMessages.length > 0 ? false : true}>
          Mark As Read
        </button>

        <button onClick={() => this.onButton('unread')} className="btn btn-default" disabled={checkedMessages.length > 0 ? false : true}>
          Mark As Unread
        </button>

        <select onChange={this.onLabelAdd} value={this.state.labelDefault} className="form-control label-select" disabled={checkedMessages.length > 0 ? false : true}>
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select onChange={this.onLabelRemove} value={this.state.labelDefault} className="form-control label-select" disabled={checkedMessages.length > 0 ? false : true}>
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button onClick={this.onDeleteClick} className="btn btn-default" disabled={checkedMessages.length > 0 ? false : true}>
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>

    )
  }
}

export default ToolBar;
