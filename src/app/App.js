import React from 'react'
import Translator from './Translator'

class App extends React.Component {
  state = {
    messages: [
      {
        en: 'Hello World',
        cs: 'Ahoj Svete'
      }, {
        en: 'Hi, my name is {name}',
        cs: 'Ahoj, jmenuji se {name}'
      }, {
        en: 'There {count, plural, zero {are no bottles} one {one bottle} other {# bottles}} hanging on the wall',
        cs: 'Na stěně {count, plural, zero {nejsou žádné láhve} one {je jedna láhev} few {jsou # láhve} many {je # láhví}}'
      }
    ],
    languages: {
      source: 'en',
      translation: 'cs'
    }
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
