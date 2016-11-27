/* @flow */
import React from 'react'

type MessageEditorProps = {
  value: string
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
      value: null
    }
  }

  handleChange = (e: SyntheticEvent) => {
    if (e.target instanceof HTMLInputElement) {
      this.setState({value: e.target.value})
    }
  }

  render() {
    const isDirty = this.state.value !== this.props.value
    const value = this.state.value || this.props.value

    return (
        <div className="MessageEditor">
          <input type="text" value={value} onChange={this.handleChange} />
        </div>
    )
  }
}

export default MessageEditor
