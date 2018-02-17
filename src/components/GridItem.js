import React from 'react'

class GridItem extends React.Component {
  render() {
    const product = this.props.product

    if (product.empty) {
      return <div className="item empty" />
    }

    if (!product.image) {
      return (
        <div className="item filled noimage">
          <div className="itemlabel">{product.label}</div>
        </div>
      )
    }

    return (
      <div className="item filled">
        <div className="itemimg">
          <img src={product.image} alt={product.label} />
        </div>
        <div className="itemlabel">{product.label}</div>
      </div>
    )
  }
}

export default GridItem
