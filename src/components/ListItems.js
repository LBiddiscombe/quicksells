import React from 'react'
import ListItem from './ListItem'

class ListItems extends React.Component {
  render() {
    const products = this.props.products

    return (
      <div className="panel-block">
        <ul className="listitems">
          {products
            .filter(product => {
              return (
                product.label.toLowerCase().indexOf(this.props.filter.toLowerCase()) !== -1 ||
                product.item.indexOf(this.props.filter) !== -1
              )
            })
            .map((product, i) => {
              return <ListItem key={i} product={product} />
            })}
        </ul>
      </div>
    )
  }
}

export default ListItems
