import React from 'react'
import GridItem from './GridItem'

class GridItems extends React.Component {
  render() {
    const products = this.props.products
    let griditems = products.map(p => {
      return <GridItem key={p.seq} product={p} />
    })

    return (
      <div id="items" className="items">
        {griditems}
      </div>
    )
  }
}

export default GridItems
