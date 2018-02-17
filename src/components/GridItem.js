import React from 'react'

class GridItem extends React.Component {
  render() {
    if (this.props.isEmpty) {
      return <div className="item empty" />
    }

    if (this.props.noImage) {
      return (
        <div className="item filled noimage">
          <div className="itemlabel">{this.props.label}</div>
        </div>
      )
    }

    return (
      <div className="item filled">
        <div className="itemimg">
          <img src={'/images/' + this.props.image} alt={this.props.label} />
        </div>
        <div className="itemlabel">{this.props.label}</div>
      </div>
    )
  }
}

export default GridItem
