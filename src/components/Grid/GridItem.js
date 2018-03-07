import React from 'react'
import ProductImage from '../ProductImage'

class GridItem extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      flipped: false
    }
  }

  handleClick() {
    const product = this.props.data
    const isWithImage = Boolean(product.image)
    if (isWithImage) {
      this.setState({
        flipped: !this.state.flipped
      })
    }
  }

  componentWillReceiveProps() {
    this.setState({
      flipped: false
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
        {isFilled && <div className="itemlabel"> {product.label} </div>}
        {!isFilled && (
          <div className="itemlabel">
            <i className="fas fa-4x fa-plus-circle" />
          </div>
        )}
      </div>
    )
  }
}

export default GridItem
