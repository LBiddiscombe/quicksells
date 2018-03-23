import React from 'react'

/*
TODO: check image exists and if not replace with placeholder
*/

const popularStyle = {
  position: 'absolute',
  left: '6px',
  top: '6px',
  color: 'rgba(255, 0, 0, 0.5)',
  zOrder: 1
}
const Popular = () => <i className="fas fa-heart" style={{ ...popularStyle }} />

class ProductImage extends React.Component {
  render() {
    const product = this.props.product
    return (
      <div className="itemimg">
        <img src={product.image ? product.image : undefined} alt="" />
        {product.isPopular && (
          <span>
            <Popular />
          </span>
        )}
      </div>
    )
  }
}

export default ProductImage
