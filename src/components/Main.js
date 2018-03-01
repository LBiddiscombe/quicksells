import React from 'react'
import Nav from './Nav'
import GridItems from './GridItems'
import ExportToCSV from '../services/ExportToCSV'

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
      <a className="export" onClick={this.handleExport}>Export</a>
    )
  }
}

class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      activegroup: '2',
      activepage: '1'
    }
    this.handleTabChange = this.handleTabChange.bind(this)
  }

  handleTabChange(e) {
    if (e.target.value) {
      this.setState({ [e.target.dataset.field]: e.target.value.toString() })
      if (e.target.dataset.field === 'activegroup') {
        this.setState({ activepage: '1' })
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
