import React from 'react'

class Search extends React.Component {
  render() {
    return (
      <div className="panel-block">
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
    )
  }
}

export default Search
