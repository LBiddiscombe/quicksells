import React from 'react'
import Nav from './Nav'
import GridItems from './GridItems'

class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      activegroup: '2',
      activepage: '1'
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
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
        <Nav
          groups={this.props.groups}
          pages={this.props.pages}
          activegroup={this.state.activegroup}
          activepage={this.state.activepage}
          handleClick={this.handleClick}
        />
        <GridItems products={products} />
      </main>
    )
  }
}

export default Main
