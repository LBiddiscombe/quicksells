import React from 'react'
import GridItem from './GridItem'
import DragDrop from '../Shared/DragDrop'

const DraggableGridItem = DragDrop(GridItem)

class GridItems extends React.Component {
  render() {
    const products = this.props.products
    let griditems = products.sort((a, b) => a.seq - b.seq).map(p => {
      return (
        <DraggableGridItem
          changeLayout={this.props.changeLayout}
          key={p.seq}
          data={p}
          draggable={!p.empty}
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
