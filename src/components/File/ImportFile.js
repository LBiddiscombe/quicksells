import React from 'react'
import ImportFromCSV from '../../modules/ImportFromCSV'

let fileInput = null

class ImportFile extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleClick() {
    fileInput.click()
  }

  handleReset(ev) {
    ev.preventDefault()
    const fileImport = this.props.fileImport
    ImportFromCSV().then(result => {
      fileImport(result)
    })
  }

  handleChange(ev) {
    const fileImport = this.props.fileImport

    const file = fileInput.files[0]
    const reader = new FileReader()
    reader.onload = function(e) {
      ImportFromCSV(e.target.result).then(result => {
        fileImport(result)
      })
    }
    reader.readAsText(file)
    ev.target.value = null
  }

  render() {
    const iconsize = this.props.iconsize ? this.props.iconsize : 'fa-2x'
    return (
      <form className="import">
        <input
          type="file"
          accept=".csv"
          ref={input => {
            fileInput = input
          }}
          onChange={this.handleChange}
          style={{ display: 'none' }}
        />
        <a className="import" onClick={this.handleClick}>
          <i className={'fas fa-upload ' + iconsize} />
        </a>
      </form>
    )
  }
}
/*
<a className="reset" onClick={this.handleReset}>
          <i className="fas fa-2x fa-window-close" />
        </a>
*/

export default ImportFile
