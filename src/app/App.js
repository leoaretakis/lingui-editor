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

  handleMessageSave = (oldMessage) => (newMessage) => {
    const {languages: {source: srcLang, translation: transLang}} = this.state
    const messages = this.state.messages.map((message) => {
      if (message[srcLang] !== oldMessage[srcLang]) return message

      return {
        ...message,
        [transLang]: newMessage
      }
    })

    this.setState({messages})
  }

  handleSave = () => {
    console.log(this.state.messages)
  }
}

export default App
