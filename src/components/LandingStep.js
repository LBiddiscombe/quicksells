import React from 'react'

class LandingStep extends React.Component {
  render() {
    const style = {
      display: 'grid',
      gridTemplateRows: '120px 50px',
      justifyItems: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      zIndex: this.props.zindex,
      border: '4px solid var(--accent-color)',
      borderLeft: !this.props.leftBorder && 'none'
    }

    const arrowClass = this.props.arrow ? 'arrow_box' : ''

    return (
      <div className={arrowClass} style={{ ...style }}>
        {this.props.children}
      </div>
    )
  }
}

export default LandingStep
