import React from 'react'
import ListItems from './List/ListItems'

class Aside extends React.Component {
  render() {
    return (
      <aside className="left">
        <nav className="panel">
          <ListItems
            allRows={this.props.allRows}
            filter={this.props.filter}
            handleProductEdit={this.props.handleProductEdit}
          />
        </nav>
      </aside>
    )
  }
}

export default Aside
