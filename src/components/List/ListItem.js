import React from 'react'

class ListItem extends React.Component {
  constructor() {
    super()
    this.handleActionClick = this.handleActionClick.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.state = {
      inEdit: false
    }
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleActionClick()
    }
  }

  handleActionClick() {
    let inEdit = this.state.inEdit

    if (inEdit) {
      let newProduct = JSON.parse(JSON.stringify(this.props.product))
      newProduct.label = this.labelInput.value
      this.props.handleProductEdit(this.props.product, newProduct)
    }

    this.setState({
      inEdit: !inEdit
    })
  }

  componentDidUpdate() {
    if (this.state.inEdit) {
      this.labelInput.focus()
      moveCursorToEnd(this.labelInput)
    }
  }

  render() {
    const product = this.props.product
    const inEdit = this.state.inEdit
    const editIcon = <i className="far fa-edit" />
    const saveIcon = <i className="far fa-save" />

    return (
      <li className="listitem">
        <div className="listitemimg">
          <img src={product.image || 'https://via.placeholder.com/84x64'} alt="" />
        </div>
        <div className="listitemlabel">
          {inEdit && (
            <input
              type="text"
              defaultValue={product.label}
              ref={input => (this.labelInput = input)}
              onKeyPress={this.handleKeyPress}
            />
          )}
          {!inEdit && product.label}
          <div className="listitemcode">
            <sup>{product.item}</sup>
          </div>
        </div>
        <div className="listitemaction">
          <a className="dark" onClick={this.handleActionClick}>
            <span className={inEdit ? 'hidden' : ''}>{editIcon}</span>
            <span className={inEdit ? '' : 'hidden'}>{saveIcon}</span>
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
