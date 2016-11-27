import React from 'react'
import MessageEditor from './MessageEditor'


class Translator extends React.Component {
  render () {
    const {
      messages,
      languages: {
        source: sourceLang,
        translation: transLang
      }
    } = this.props

    return (
      <div className="Translator">
        {Object.keys(messages).map((key) => {
          const message = messages[key]
          return (
            <div className="Translator__message" key={message[sourceLang]}>
              <div className="Translator__message --source">
                {message[sourceLang]}
              </div>
              <div className="Translator__message --translation">
                <MessageEditor
                  value={message[transLang]}
                  onSave={this.props.onSave(key)}
                />
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Translator
