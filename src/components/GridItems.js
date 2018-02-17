import React from 'react'
import GridItem from './GridItem'

class GridItems extends React.Component {
  render() {
    const products = this.props.products
    let griditems = products.map(p => {
      return (
        <GridItem
          image={p.Image}
          noImage={p.Image === 'NULL'}
          label={p.Description}
          key={p.Description}
          isEmpty={p.Empty}
        />
      )
    })

    return (
      <div id="items" className="items">
        {griditems}
      </div>
    )
  }
}

export default GridItems
