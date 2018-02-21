import React from 'react'
import GridItem from './GridItem'

class GridItems extends React.Component {
  render() {
    const products = this.props.products
    let griditems = products.sort((a, b) => a.seq - b.seq).map(p => {
      return <GridItem key={p.seq} product={p} changeLayout={this.props.changeLayout} />
    })

    return (
      <div id="items" className="items">
        {griditems}
      </div>
    )
  }
}

export default GridItems
