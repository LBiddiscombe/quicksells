import React from 'react'
import Navbar from './Navbar'
import Tabs from './Tabs'
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
    let gridProducts = []
    const { handleFileExport, changeLayout, droptarget, ...rest } = this.props

    const products = this.props.products
    if (products) {
      gridProducts = products.filter(
        r => r.group === this.state.activegroup && r.page === this.state.activepage
      )
    }

    return (
      <main {...rest} id="main">
        <ExportFile products={products} handleFileExport={this.props.handleFileExport} />
        <Navbar
          groups={this.props.groups}
          pages={this.props.pages}
          handleTabChange={this.handleTabChange}
        >
          <Tabs
            tabs={this.props.groups}
            controlField="activegroup"
            activeId={this.state.activegroup}
          />
          <Tabs
            tabs={this.props.pages}
            controlField="activepage"
            activeId={this.state.activepage}
          />
        </Navbar>
        <GridItems products={gridProducts} changeLayout={this.props.changeLayout} />
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
