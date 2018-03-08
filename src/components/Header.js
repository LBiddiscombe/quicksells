import React from 'react'
import CloseFile from './File/CloseFile'
import Logo from './Logo'

class Header extends React.Component {
  render() {
    const fullwidth = this.props.fullwidth ? 'fullwidth' : ''
    const layout = this.props.layout
    return (
      <header className={fullwidth}>
        <div className="headerleft">
          <Logo />
        </div>
        <div className="headercenter">
          <p className="title is-4 has-text-light">Quicksell Builder</p>
        </div>
        {!fullwidth &&
          layout.groups && (
            <div className="headerright">
              <CloseFile handleFileClose={this.props.handleFileClose} />
            </div>
          )}
      </header>
    )
  }
}

export default Header
