import React from 'react'
import ProductImage from '../Shared/ProductImage'
import Modal from '../Modal'

class GridItem extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      flipped: false,
      isModalOpen: false
    }
  }

  handleClick(e) {
    if (!e.target.id) {
      return
    }

    const product = this.props.data
    const isWithImage = Boolean(product.image)
    const isFilled = !product.empty

    if (isFilled) {
      if (isWithImage) {
        this.setState({
          flipped: !this.state.flipped
        })
      }
    } else {
      this.setState({
        isModalOpen: true
      })
    }
  }

  closeModal() {
    this.setState({
      isModalOpen: false
    })
  }

  componentWillReceiveProps() {
    this.setState({
      flipped: false,
      isModalOpen: false
    })
  }

  render() {
    const { changeLayout, ...rest } = this.props // disard chnageLayout from props for DOM use below
    const product = this.props.data
    const isFilled = !product.empty
    const isWithImage = Boolean(product.image)
    var classNames = ['item']
    classNames.push(isFilled ? 'filled' : 'empty')
    if (!isWithImage) classNames.push('noimage')
    if (isWithImage && this.state.flipped) classNames.push('flipped')

    return (
      <div
        {...rest}
        id={'Item' + product.seq}
        ref={'Item' + product.seq}
        className={classNames.join(' ')}
        onClick={this.handleClick}
      >
        {isWithImage && <ProductImage product={product} />}
        {isFilled && <div className="itemlabel"> {product.label.replace('�', '£')} </div>}
        {!isFilled && (
          <div className="itemlabel">
            <i className="fas fa-4x fa-plus-circle" />
          </div>
        )}
        <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
          <p className="title is-4 has-text-centered">Add Product</p>
          <ul>
            <li>Possibly, but maybe not?!</li>
            <li>Select from items not currently assigned? Need a way to add these in aside</li>
            <li>Create new item here? Maybe better in the aside</li>
            <li>Consider using just the aside for CRUD, drag item onto grid to add to layout</li>
          </ul>
        </Modal>
      </div>
    )
  }
}

export default GridItem
