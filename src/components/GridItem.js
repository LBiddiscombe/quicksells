import React from 'react'

function stopBodyScrolling(bool) {
  if (bool === true) {
    document.body.addEventListener('touchmove', freezeVp, false)
  } else {
    document.body.removeEventListener('touchmove', freezeVp, false)
  }
}

var freezeVp = function(e) {
  e.preventDefault()
}

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
    stopBodyScrolling(true)
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
    stopBodyScrolling(false)
    ev.target.classList.remove('dragover')
    let source = JSON.parse(ev.dataTransfer.getData('text'))
    this.props.changeLayout(source, target.props.product)
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
