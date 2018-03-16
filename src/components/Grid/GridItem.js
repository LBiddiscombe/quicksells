import React from 'react'
import ProductImage from '../Shared/ProductImage'

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
    const { changeLayout, droptarget, ...rest } = this.props // disard chnageLayout from props for DOM use below
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
      </div>
    )
  }
}

export default GridItem
