import React from 'react'

/*

TODO: check image exists and if not replace with placeholder

*/

class ProductImage extends React.Component {
  render() {
    const product = this.props.product
    return (
      <div className="itemimg">
        <img src={product.image} alt="" />
      </div>
    )
  }
}

export default ProductImage
