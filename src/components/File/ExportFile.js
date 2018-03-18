import React from 'react'

class ExportFile extends React.Component {
  render() {
    return (
      <a className="export" onClick={this.props.handleFileExport}>
        <i className="far fa-2x fa-save" />
      </a>
    )
  }
}

export default ExportFile
