import React from 'react'
import ListItem from './ListItem'

class ListItems extends React.Component {
  render() {
    const products = this.props.products

    return (
      <div className="panel-block">
        <ul className="listitems">
          {products.map((product, i) => {
            return <ListItem key={i} product={product} />
          })}
        </ul>
      </div>
    )
  }
}

export default ListItems
