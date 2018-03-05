import React from 'react'
import ImportFile from './ImportFile'
import Logo from './Logo'

class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="headerleft">
          <Logo />
        </div>
        <div className="headercenter">
          <p className="title is-4 has-text-light">Quicksell Builder</p>
        </div>
        <div className="headerright">
          <ImportFile fileImport={this.props.fileImport} />
        </div>
      </header>
    )
  }
}

export default Header
