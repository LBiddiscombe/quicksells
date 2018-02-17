import React from "react";

class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="headerleft">
          <i className="fas fa-3x fa-th" />
        </div>
        <div className="headercenter">
          <p className="title is-4 has-text-light">Quicksell Builder</p>
        </div>
        <div className="headerright" />
      </header>
    );
  }
}

export default Header;
