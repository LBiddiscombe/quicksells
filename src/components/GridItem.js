import React from 'react'
import Zoom from 'react-reveal/Zoom'

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

  render() {
    const product = this.props.product
    const isFilled = !product.empty
    const isWithImage = Boolean(product.image)
    var classNames = ['item']
    classNames.push(isFilled ? 'filled' : 'empty')
    if (!isWithImage) classNames.push('noimage')

    return (
      <Zoom disabled appear mountOnEnter delay={10 * (product.seq - 1)} duration={100} spy={product}>
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
      </Zoom>
    )
  }
}

export default GridItem
