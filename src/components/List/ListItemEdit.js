import React from 'react'
import ProductImage from '../Shared/ProductImage'

class ListItem extends React.Component {
  constructor() {
    super()
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.onActionClick = this.onActionClick.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.onActionClick()
    }
  }

  onActionClick(e) {
    let newProduct = JSON.parse(JSON.stringify(this.props.product))
    newProduct.label = this.labelInput.value
    this.props.handleActionClick(e, this.props.index, this.props.product, newProduct)
  }

  onCancel(e) {
    this.props.handleActionClick(e, this.props.index)
  }

  componentDidMount() {
    this.labelInput.focus()
    moveCursorToEnd(this.labelInput)
  }

  render() {
    const product = this.props.product

    return (
      <li className="listitem">
        <div className="listitemimg">
          <ProductImage product={product} />
        </div>
        <div className="listitemlabel">
          <input
            type="text"
            defaultValue={product.label}
            ref={input => (this.labelInput = input)}
            onKeyPress={this.handleKeyPress}
          />

          <div className="listitemcode">
            <sup>{product.item}</sup>
          </div>
        </div>
        <div className="listitemaction">
          <a className="dark" onClick={this.onActionClick}>
            <i className="far fa-save" />
          </a>
          <a className="dark" onClick={this.onCancel}>
            <i className="far fa-window-close" />
          </a>
        </div>
      </li>
    )
  }
}

function moveCursorToEnd(el) {
  if (typeof el.selectionStart === 'number') {
    el.selectionStart = el.selectionEnd = el.value.length
  } else if (typeof el.createTextRange !== 'undefined') {
    el.focus()
    var range = el.createTextRange()
    range.collapse(false)
    range.select()
  }
}

export default ListItem
