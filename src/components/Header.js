import React from 'react'
import ImportFile from './ImportFile'
import Logo from './Logo'

class Header extends React.Component {
  render() {
    const fullwidth = this.props.fullwidth ? 'fullwidth' : ''
    return (
      <header className={fullwidth}>
        <div className="headerleft">
          <Logo />
        </div>
        <div className="headercenter">
          <p className="title is-4 has-text-light">Quicksell Builder</p>
        </div>
        {fullwidth && (
          <div className="headerright">
            <ImportFile fileImport={this.props.fileImport} />
          </div>
        )}
      </header>
    )
  }
}

export default Header
