import React from 'react'
import Filter from './Filter'
import ListItems from './List/ListItems'

class Aside extends React.Component {
  constructor() {
    super()
    this.state = {
      filtertext: '',
      filtergroup: -1
    }
    this.handleFilterChange = this.handleFilterChange.bind(this)
  }

  handleFilterChange(filtertext, filtergroup) {
    this.setState({ filtertext, filtergroup })
  }

  render() {
    return (
      <aside className="left">
        <Filter groups={this.props.groups} handleFilterChange={this.handleFilterChange} />
        <ListItems
          products={this.props.products}
          filtertext={this.state.filtertext}
          filtergroup={this.state.filtergroup}
          handleProductEdit={this.props.handleProductEdit}
        />
      </aside>
    )
  }
}

export default Aside
