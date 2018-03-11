import React from 'react'

const DragDrop = WrappedComponent => {
  return class extends React.Component {
    constructor() {
      super()
      this.handleDragStart = this.handleDragStart.bind(this)
      this.handleDragEnter = this.handleDragEnter.bind(this)
      this.handleDragLeave = this.handleDragLeave.bind(this)
      this.handleDragOver = this.handleDragOver.bind(this)
      this.handleDrop = this.handleDrop.bind(this)
    }

    handleDragStart(ev) {
      ev.dataTransfer.setData('text', JSON.stringify(this.props.data))
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
      this.props.changeLayout(source, target.props.data)
    }

    touchMove(ev) {
      ev.preventDefault()
    }

    render() {
      const product = this.props.data
      const isFilled = !product.empty

      return (
        <WrappedComponent
          {...this.props}
          draggable={isFilled}
          onDragStartCapture={isFilled ? this.handleDragStart : null}
          onDragEnterCapture={this.handleDragEnter}
          onDragLeaveCapture={this.handleDragLeave}
          onDragOverCapture={this.handleDragOver}
          onDropCapture={e => this.handleDrop(e, this)}
          onTouchMoveCapture={isFilled ? e => this.touchMove(e) : null}
          className={this.props.className}
        />
      )
    }
  }
}

export default DragDrop
