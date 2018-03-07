import React from 'react'

class LandingStep extends React.Component {
  render() {
    const style = {
      display: 'grid',
      gridTemplateRows: '2fr 1fr',
      justifyItems: 'center',
      justifySelf: 'center',
      alignItems: 'center',
      width: '100%',
      minWidth: '220px',
      height: '100%',
      zIndex: this.props.zindex,
      border: '4px solid var(--aside-bg)',
      borderRadius: '10px',
      boxShadow: 'var(--shadow)'
    }

    return (
      <div className="landingstep" style={{ ...style }}>
        {this.props.children}
      </div>
    )
  }
}

export default LandingStep
