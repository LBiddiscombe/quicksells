import React from 'react'

function Header() {
  return (
    <header>
      <div className="headerleft">
        <span className="fa-layers fa-fw">
          <i className="fas fa-square-full" data-fa-transform="" />
          <i className="fas fa-square-full" data-fa-transform="left-18" />
          <i className="fas fa-square-full" data-fa-transform="right-18" />
          <i className="fas fa-square-full" data-fa-transform="up-18" />
          <i className="fas fa-square-full" data-fa-transform="left-18 down-18" />
          <i
            className="fas fa-square-full"
            data-fa-transform="right-18 down-18"
            style={{ color: 'rgba(255, 255, 255, 0.05)' }}
          />
          <i className="fas fa-square-full" data-fa-transform="down-18" />
          <i className="fas fa-square-full" data-fa-transform="left-18 up-18" />
          <i className="fas fa-square-full" data-fa-transform="right-18 up-18" />
        </span>
      </div>
      <div className="headercenter">
        <p className="title is-4 has-text-light">Quicksell Builder</p>
      </div>
      <div className="headerright" />
    </header>
  )
}

export default Header
