import React from 'react'
import Translator from './Translator'

class App extends React.Component {
  state = {
    messages: [],
    languages: {
      source: 'en',
      translation: 'cs'
    }
  }

  componentWillMount() {
    fetch('/api/messages/example/')
    .then((res) => res.json())
    .then((data) => this.setState({messages: data}))
  }

  render () {
    return (
      <div className="App">
        <header>
          <button onClick={this.handleSave}>Save</button>
        </header>
        <Translator {...this.state} onSave={this.handleMessageSave} />
      </div>
    )
  }

  handleMessageSave = (key) => (newMessage) => {
    const {messages, languages: {translation: transLang}} = this.state

    const newMessages = {
      ...messages,
      [key]: {
        ...messages[key],
        [transLang]: newMessage
      }
    }

    this.setState({messages: newMessages})
  }

  handleSave = () => {
    const language = this.state.languages.translation
    const messages = {}

    Object.keys(this.state.messages).forEach((key) => {
      messages[key] = this.state.messages[key][language]
    })

    fetch('/api/messages/example/', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({language, messages})
    })
  }
}

export default App
