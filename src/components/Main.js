import React from 'react'
import Nav from './Nav'
import GridItems from './GridItems'
import ExportToCSV from '../services/ExportToCSV'
import ImportFromCSV from '../services/ImportFromCSV'

let fileInput = null

class Import extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleClick() {
    fileInput.click()
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
    return (
      <div className="import">
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
          <span>
            <i className="fas fa-2x fa-upload" />
          </span>
        </a>
      </div>
    )
  }
}

class Export extends React.Component {
  constructor() {
    super()
    this.handleExport = this.handleExport.bind(this)
  }

  handleExport() {
    ExportToCSV(this.props.layout)
  }

  render() {
    return (
      <a className="export" onClick={this.handleExport}>
        <i className="far fa-2x fa-save" />
      </a>
    )
  }
}

class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      activegroup: 2,
      activepage: 1
    }
    this.handleTabChange = this.handleTabChange.bind(this)
  }

  handleTabChange(e) {
    if (e.target.value) {
      this.setState({ [e.target.dataset.field]: e.target.value })
      if (e.target.dataset.field === 'activegroup') {
        this.setState({ activepage: 1 })
      }
    }
  }

  render() {
    var products = []

    const layout = this.props.layout
    if (layout.groups) {
      products = layout.groups
        .find(g => g.id === this.state.activegroup)
        .pages.find(p => p.id === this.state.activepage).products
    }

    return (
      <main id="main">
        <Import fileImport={this.props.fileImport} />
        <Export layout={layout} />
        <Nav
          groups={this.props.groups}
          pages={this.props.pages}
          activegroup={this.state.activegroup}
          activepage={this.state.activepage}
          handleTabChange={this.handleTabChange}
        />
        <GridItems products={products} changeLayout={this.props.changeLayout} />
      </main>
    )
  }
}

export default Main
