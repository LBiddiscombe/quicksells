import React from 'react'
import ProductImage from '../Shared/ProductImage'

const Popular = () => <i className="fas fa-heart" style={{ color: 'tomato' }} />

class ListItem extends React.Component {
  render() {
    const product = this.props.data
    const {
      changeLayout,
      inEdit,
      handleProductEdit,
      handleActionClick,
      droptarget,
      ...rest
    } = this.props

    return (
      <li {...rest} className="listitem">
        <div className="listitemimg">
          <ProductImage product={product} />
        </div>
        <div className="listitemlabel">
          {product.isPopular && (
            <span>
              <Popular />
            </span>
          )}
          {' ' + product.label}

          <div className="listitemcode">
            <sup>{product.item}</sup>
          </div>
        </div>
        <div className="listitemaction">
          {!inEdit && (
            <a className="dark" onClick={e => this.props.handleActionClick(e, this.props.index)}>
              <i className="far fa-edit" />
            </a>
          )}
        </div>
      </li>
    )
  }
}

export default ListItem
