import React from 'react'

class Filter extends React.Component {
  componentDidUpdate() {
    const main = document.getElementById('main')
    const filterwrap = document.getElementById('filterwrap')
    filterwrap.style.top = main.clientHeight + 'px'
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
          placeholder="search name or code"
          onChange={this.props.handleFilterChange}
          onDrop={e => this.handleDrop(e, this)}
        />
      </div>
    )
  }
}

export default Filter
