/* @flow */
import React from 'react'

type MessageEditorProps = {
  value: string,
  onSave: Function
}

type MessageEditorState = {
  value: ?string
}

class MessageEditor extends React.Component {
  props: MessageEditorProps
  state: MessageEditorState

  constructor(props: MessageEditorProps) {
    super(props)

    this.state = {
      value: props.value
    }
  }

  render() {
    const isDirty = this.state.value !== this.props.value
    const value = this.state.value || this.props.value

    return (
        <div className="MessageEditor">
          <input
            type="text"
            value={value}
            onChange={this.handleChange}
            onBlur={this.saveMessage}
            onKeyPress={this.handleKeyPress}
          />
        </div>
    )
  }

  handleChange = (e: SyntheticEvent) => {
    if (e.target instanceof HTMLInputElement) {
      this.setState({value: e.target.value})
    }
  }

  handleKeyPress = (e: SyntheticKeyboardEvent) => {
    if (e.key === 'Enter') {
      this.saveMessage()
    }
  }

  saveMessage = () => {
    this.props.onSave(this.state.value)
  }
}

export default MessageEditor
