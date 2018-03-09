import React from 'react'

class ListItem extends React.Component {
  constructor() {
    super()
    this.toggleEdit = this.toggleEdit.bind(this)
    this.state = {
      inEdit: false
    }
  }

  toggleEdit(e) {
    e.preventDefault()
    this.setState({
      inEdit: !this.state.inEdit
    })
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
          {product.label + (inEdit ? ' in edit' : '')}
          <div className="listitemcode">
            <sup>{product.item}</sup>
          </div>
        </div>
        <div className="listitemaction">
          <a className="dark" onClick={this.toggleEdit}>
            <span className={inEdit ? 'hidden' : ''}>{editIcon}</span>
            <span className={inEdit ? '' : 'hidden'}>{saveIcon}</span>
          </a>
        </div>
      </li>
    )
  }
}

export default ListItem
