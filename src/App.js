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

  onMessageChange = (key, id) => {
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

  onReadButton = (str) => {
    const bool = str === 'read';
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

  onCompose = () => {
    this.setState({isCompose: !this.state.isCompose})
  }

  addMessage = ({subject, body}) => {
    this.setState(({messages}) => {
      let obj = {
        body,
        subject,
        checked: false,
        read: false,
        starred: false,
        id: messages[messages.length - 1].id + 1,
        labels: []
      }
      return {messages: [...messages, obj]}
    })
  }

  render() {
    return (
      <div className="App">
        <ToolBar onCompose={this.onCompose} isCompose={this.state.isCompose} messages={this.state.messages} onReadButton={this.onReadButton}/>
        {this.state.isCompose && <ComposeMessage onCompose={this.onCompose} addMessage={this.addMessage}/>}
        <Messages onMessageChange={this.onMessageChange} messages={this.state.messages}/>
      </div>
    );
  }
}

export default App;
