import React from 'react'

class Filter extends React.Component {
  componentDidUpdate() {
    const main = document.getElementById('main')
    const filterwrap = document.getElementById('filterwrap')
    filterwrap.style.top = main.clientHeight + 'px'
  }

  render() {
    return (
      <div id="filterwrap">
        <input
          className="input"
          type="text"
          placeholder="search name or code"
          onChange={this.props.handleFilterChange}
        />
      </div>
    )
  }
}

export default Filter
