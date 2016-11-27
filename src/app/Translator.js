import React from 'react'

class Translator extends React.Component {
  render () {
    const {
      messages,
      languages: {
        source: sourceLang,
        translation: transLang
      }
    } = {
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

    return (
      <div className="Translator">
        {messages.map((message) =>
          <div className="Translator__message" key={message[sourceLang]}>
            <div className="Translator__message --source">
              {message[sourceLang]}
            </div>
            <div className="Translator__message --translation">
              {message[transLang]}
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Translator
