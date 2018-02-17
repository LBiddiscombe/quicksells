import React from "react";

class Search extends React.Component {
  render() {
    return (
      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            className="input"
            type="text"
            placeholder="search name or code"
          />
          <span className="icon is-small is-left">
            <i className="fas fa-search" />
          </span>
        </p>
        <button id="resetfilter" className="button is-link is-outlined">
          reset filters
        </button>
      </div>
    );
  }
}

export default Search;
