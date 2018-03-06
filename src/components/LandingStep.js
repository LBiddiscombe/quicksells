import React from 'react'

class LandingStep extends React.Component {
  render() {
    const style = {
      display: 'grid',
      gridTemplateRows: '2fr 1fr',
      justifyItems: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      zIndex: this.props.zindex,
      border: '4px solid var(--aside-bg)',
      borderTop: !this.props.leftBorder && 'none',
      backgroundColor: !this.props.arrow && 'var(--header-bg)'
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
