import React from 'react'
import Nav from './Nav'
import GridItems from './Grid/GridItems'
import ExportFile from './File/ExportFile'
import settings from '../settings'

class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      activegroup: 2,
      activepage: 1
    }
    this.handleTabChange = this.handleTabChange.bind(this)
  }

  componentDidMount() {
    setItemGridHeight()
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
    let products = []

    const allRows = this.props.allRows
    if (allRows) {
      products = allRows.filter(
        r => r.group === this.state.activegroup && r.page === this.state.activepage
      )
    }

    return (
      <main id="main">
        <ExportFile allRows={allRows} />
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

window.onresize = function() {
  setItemGridHeight()
}

function setItemGridHeight() {
  const items = document.getElementById('items')
  if (items !== null)
    items.style.height =
      items.clientWidth * settings.grid.import.rows / settings.grid.import.columns + 'px'
}

export default Main
