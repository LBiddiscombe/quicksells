import React from 'react'

class GridItem extends React.Component {
  constructor() {
    super()
    this.handleDragStart = this.handleDragStart.bind(this)
    this.handleDragEnter = this.handleDragEnter.bind(this)
    this.handleDragLeave = this.handleDragLeave.bind(this)
    this.handleDragOver = this.handleDragOver.bind(this)
    this.handleDrop = this.handleDrop.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      flipped: false
    }
  }

  handleDragStart(ev) {
    ev.dataTransfer.setData('text', JSON.stringify(this.props.product))
  }

  handleDragEnter(ev) {
    ev.preventDefault()
    ev.target.classList.add('dragover')
  }

  handleDragLeave(ev) {
    ev.preventDefault()
    ev.target.classList.remove('dragover')
  }

  //dragover event = allow drop
  handleDragOver(ev) {
    ev.preventDefault()
  }

  handleDrop(ev, target) {
    ev.preventDefault()
    ev.target.classList.remove('dragover')
    let source = JSON.parse(ev.dataTransfer.getData('text'))
    this.props.changeLayout(source, target.props.product)
  }

  touchMove(ev) {
    ev.preventDefault()
  }

  handleClick() {
    const product = this.props.product
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
    const product = this.props.product
    const isFilled = !product.empty
    const isWithImage = Boolean(product.image)
    var classNames = ['item']
    classNames.push(isFilled ? 'filled' : 'empty')
    if (!isWithImage) classNames.push('noimage')
    if (isWithImage && this.state.flipped) classNames.push('flipped')

    return (
      <div
        id={'Item' + product.seq}
        ref={'Item' + product.seq}
        className={classNames.join(' ')}
        draggable={isFilled}
        onClick={this.handleClick}
        onDragStartCapture={isFilled ? this.handleDragStart : null}
        onDragEnterCapture={this.handleDragEnter}
        onDragLeaveCapture={this.handleDragLeave}
        onDragOverCapture={this.handleDragOver}
        onDropCapture={e => this.handleDrop(e, this)}
        onTouchMove={isFilled ? e => this.touchMove(e) : null}
      >
        {isWithImage && (
          <div className="itemimg">
            <img src={product.image} alt={product.label} />
          </div>
        )}
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
