import React from 'react'
import Search from './Search'
import ListItems from './ListItems'

class Aside extends React.Component {
  render() {
    return (
      <aside className="left">
        <nav className="panel">
          <Search />
          <ListItems {...this.props} />
        </nav>
      </aside>
    )
  }
}

export default Aside
