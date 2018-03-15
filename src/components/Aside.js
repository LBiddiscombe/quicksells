import React from 'react'
import ListItems from './List/ListItems'

class Aside extends React.Component {
  render() {
    return (
      <aside className="left">
        <ListItems
          products={this.props.products}
          filter={this.props.filter}
          handleProductEdit={this.props.handleProductEdit}
        />
      </aside>
    )
  }
}

export default Aside
