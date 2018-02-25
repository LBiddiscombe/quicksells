import React from 'react'

class ListItem extends React.Component {
  render() {
    const product = this.props.product

    return (
      <li className="listitem">
        <div className="listitemimage">
          <img
            className="listitemimage"
            src={product.image || 'http://via.placeholder.com/84x64'}
            alt=""
          />
        </div>
        <div className="listitemlabel">
          {product.label}
          <div className="listitemcode">
            <sup>{product.item}</sup>
          </div>
        </div>
      </li>
    )
  }
}

export default ListItem
