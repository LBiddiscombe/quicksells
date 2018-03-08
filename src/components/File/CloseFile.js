import React from 'react'

class CloseFile extends React.Component {
  render() {
    return (
      <a className="close" onClick={this.props.handleFileClose}>
        <i className="far fa-2x fa-window-close" />
      </a>
    )
  }
}

export default CloseFile
