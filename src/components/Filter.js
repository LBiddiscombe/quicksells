import React from 'react'

class Filter extends React.Component {
  constructor() {
    super()
    this.handleResetFilter = this.handleResetFilter.bind(this)
  }
  componentDidUpdate() {
    const main = document.getElementById('main')
    const filterwrap = document.getElementById('filterwrap')
    filterwrap.style.top = main.clientHeight + 'px'
  }

  handleResetFilter() {
    this.filterInput.value = ''
    this.props.handleFilterChange()
  }

  handleDrop(ev) {
    ev.preventDefault()
    let source = JSON.parse(ev.dataTransfer.getData('text'))
    ev.target.value = source.label
    this.props.handleFilterChange(ev)
  }

  render() {
    return (
      <div id="filterwrap">
        <input
          className="input"
          type="text"
          ref={input => (this.filterInput = input)}
          placeholder="search name or code"
          onChange={this.props.handleFilterChange}
          onDrop={e => this.handleDrop(e, this)}
        />
        <a className="filterreset dark" onClick={this.handleResetFilter}>
          <i className="fas fa-times-circle" />
        </a>
      </div>
    )
  }
}

export default Filter
