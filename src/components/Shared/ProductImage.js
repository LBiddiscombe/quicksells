import React from 'react'
import styled from 'styled-components'

/*
TODO: check image exists and if not replace with placeholder
*/

class ProductImage extends React.Component {
  render() {
    const product = this.props.product
    return (
      <Div>
        <img src={product.image ? product.image : undefined} alt="" />
        {product.isPopular && <Popular />}
      </Div>
    )
  }
}

const Div = styled.div`
   {
    position: relative;
    grid-area: image;
    pointer-events: none;
    height: 100%;
    > img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
    >span.hidden
  }
`

const Span = styled.span`
   {
    position: absolute;
    left: 0.25rem;
    top: 0.25rem;
    color: rgba(255, 0, 0, 0.5);
  }
`

const Popular = () => (
  <Span>
    <i className="fas fa-heart" />
  </Span>
)

export default ProductImage
