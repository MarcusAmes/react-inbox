import React, { Component } from 'react';
import './App.css';
import ToolBar from './components/ToolBar'
import Messages from './components/Messages'
import ComposeMessage from './components/ComposeMessage'

class App extends Component {

  state = {
    messages: [],
    isCompose: false
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:8082/api/messages')
    const json = await response.json()
    const messages = json.map((message) => {
      const obj = message;
      obj.checked = false;
      return obj;
    })
    this.setState({messages: messages})
  }

  getCheckedIds = () => {
    const checkedMessages = this.state.messages.filter((message) => message.checked);
    const checkedIds = checkedMessages.map((item) => item.id)
    return checkedIds
  }

  onMessageChange = (key, id) => {
    if(key === 'starred'){
      const worked = this.onPatch([id], 'star')
      if(worked) {
        this.setState(({messages}) => {
          const newMessages = messages.map((message, idx) => {
            if (message.id === id) {
              message[key] = !message[key]
            }
            return message
          })
          return {newMessages}
        })
      }
    } else {
      this.setState(({messages}) => {
        const newMessages = messages.map((message, idx) => {
          if (message.id === id) {
            message[key] = !message[key]
          }
          return message
        })
        return {newMessages}
      })
    }

  }

  onReadButton = (str) => {
    const bool = str === 'read';
    const worked = this.onPatch(this.getCheckedIds(), 'read', bool)

    if(worked) {
      this.setState(({messages}) => {
        const newMessages = messages.map((message, idx) => {
          if (message.checked) {
            message.read = bool
          }
          return message
        })
        return {newMessages}
      })
    }
  }

  onCompose = () => {
    this.setState({isCompose: !this.state.isCompose})
  }

  onMarkBulk = (isAllSelected) => {
    this.setState(({messages}) => {
      return { messages: messages.map((message) => {
          message.checked = !isAllSelected;
          return message
        })
      }
    })
  }

  addMessage = (data) => {
    fetch('http://localhost:8082/api/messages', {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => this.setState(({messages}) => {
      response.checked = false;
      return {messages: [...messages, response]}
    }))
    .catch(error => console.error('Error:', error));
    this.setState({isCompose: false})
  }

  onPatch = (ids, command, read, label) => {
    const data = {messageIds: ids, command: command, read: read, label: label}
    return fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.ok)
  }

  onDeleteClick = () => {
    const worked = this.onPatch(this.getCheckedIds(), 'delete')

    if (worked) {
      this.setState(({messages}) => {
        return { messages: messages.filter((message) => !message.checked)
        }
      })
    }
  }

  onLabelAdd = (val) => {
    const worked = this.onPatch(this.getCheckedIds(), 'addLabel', null, val)

    if(worked) {
      this.setState(({messages}) => {
        const newMessages = messages.map((message, idx) => {
          if (message.checked) {
            if (!message.labels.includes(val)){
              message.labels.push(val)
            }
          }
          return message
        })
        return {newMessages}
      })
    }
  }

  onLabelRemove = (val) => {
    const worked = this.onPatch(this.getCheckedIds(), 'removeLabel', null, val)
    if(worked) {
      this.setState(({messages}) => {
        const newMessages = messages.map((message, idx) => {
          if (message.checked) {
            if (message.labels.includes(val)){
              message.labels = message.labels.filter(label => label !== val)
            }
          }
          return message
        })
        return {newMessages}
      })
    }
  }

  render() {
    return (
      <div className="App">
        <ToolBar onLabelAdd={this.onLabelAdd} onLabelRemove={this.onLabelRemove} onDeleteClick={this.onDeleteClick} onMarkBulk={this.onMarkBulk} onCompose={this.onCompose} isCompose={this.state.isCompose} messages={this.state.messages} onReadButton={this.onReadButton}/>
        {this.state.isCompose && <ComposeMessage onCompose={this.onCompose} addMessage={this.addMessage}/>}
        <Messages onMessageChange={this.onMessageChange} messages={this.state.messages}/>
      </div>
    );
  }
}

export default App;
