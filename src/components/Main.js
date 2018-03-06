import React from 'react'
import Nav from './Nav'
import ExportFile from './ExportFile'
import GridItems from './Grid/GridItems'
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
    var products = []

    const layout = this.props.layout
    if (layout.groups) {
      products = layout.groups
        .find(g => g.id === this.state.activegroup)
        .pages.find(p => p.id === this.state.activepage).products
    }

    return (
      <main id="main">
        {layout.groups && <ExportFile layout={layout} />}
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
