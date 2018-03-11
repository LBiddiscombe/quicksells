import React from 'react'
import ExportToCSV from '../../services/ExportToCSV'

class ExportFile extends React.Component {
  constructor() {
    super()
    this.handleExport = this.handleExport.bind(this)
  }

  handleExport() {
    ExportToCSV(this.props.allRows)
  }

  render() {
    return (
      <a className="export" onClick={this.handleExport}>
        <i className="far fa-2x fa-save" />
      </a>
    )
  }
}

export default ExportFile
