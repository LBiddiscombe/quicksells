import React from 'react'

class Logo extends React.Component {
  render() {
    const size = this.props.size ? 'fa-' + this.props.size + 'x' : ''
    return (
      <span className={'fa-layers fa-fw ' + size}>
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
    )
  }
}

export default Logo
