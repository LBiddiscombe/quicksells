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
        <div className="panel-block filter">
          <p className="control has-icons-left">
            <input
              className="input"
              type="text"
              placeholder="search name or code"
              onChange={this.props.handleFilterChange}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-search" />
            </span>
          </p>
        </div>
      </div>
    )
  }
}

export default Filter
