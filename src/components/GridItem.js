import React from 'react'

const body = document.body

class GridItem extends React.Component {
  constructor() {
    super()
    this.handleDragStart = this.handleDragStart.bind(this)
    this.handleDragEnter = this.handleDragEnter.bind(this)
    this.handleDragLeave = this.handleDragLeave.bind(this)
    this.handleDragOver = this.handleDragOver.bind(this)
    this.handleDrop = this.handleDrop.bind(this)
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

  touchStart(ev) {
    ev.preventDefault()
  }

  touchMove(ev) {
    ev.preventDefault()
  }

  render() {
    const product = this.props.product
    const isFilled = !product.empty
    const isWithImage = Boolean(product.image)
    var classNames = ['item']
    classNames.push(isFilled ? 'filled' : 'empty')
    if (!isWithImage) classNames.push('noimage')

    return (
      <div
        id={'Item' + product.seq}
        ref={'Item' + product.seq}
        className={classNames.join(' ')}
        draggable={isFilled}
        onDragStartCapture={isFilled ? this.handleDragStart : null}
        onDragEnterCapture={this.handleDragEnter}
        onDragLeaveCapture={this.handleDragLeave}
        onDragOverCapture={this.handleDragOver}
        onDropCapture={e => this.handleDrop(e, this)}
        onTouchStart={e => this.touchStart(e)}
        onTouchMove={e => this.touchMove(e)}
      >
        {isWithImage && (
          <div className="itemimg">
            <img src={product.image} alt={product.label} />
          </div>
        )}
        {isFilled && <div className="itemlabel">{product.label}</div>}
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
