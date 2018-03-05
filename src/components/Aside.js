import React from 'react'
import ListItems from './List/ListItems'

class Aside extends React.Component {
  render() {
    return (
      <aside className="left">
        <nav className="panel">
          <ListItems products={this.props.products} filter={this.props.filter} />
        </nav>
      </aside>
    )
  }
}

export default Aside
