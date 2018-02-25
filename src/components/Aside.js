import React from 'react'
import Search from './Search'
import ListItems from './ListItems'

class Aside extends React.Component {
  constructor() {
    super()
    this.state = {
      filter: ''
    }
    this.handleFilterChange = this.handleFilterChange.bind(this)
  }

  handleFilterChange(e) {
    this.setState({ filter: e.target.value })
  }

  render() {
    return (
      <aside className="left">
        <nav className="panel">
          <Search handleFilterChange={this.handleFilterChange} />
          <ListItems products={this.props.products} filter={this.state.filter} />
        </nav>
      </aside>
    )
  }
}

export default Aside
