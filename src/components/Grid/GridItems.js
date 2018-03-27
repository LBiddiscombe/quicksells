import React from 'react'
import GridItem from './GridItem'
import DragDrop from '../Shared/DragDrop'
import styled from 'styled-components'

const DragDropGridItem = DragDrop(GridItem)

class GridItems extends React.Component {
  render() {
    const products = this.props.products
    let griditems = products.sort((a, b) => a.seq - b.seq).map(p => {
      return (
        <DragDropGridItem
          changeLayout={this.props.changeLayout}
          key={p.seq}
          data={p}
          draggable={!p.empty}
          droptarget={true}
        />
      )
    })

    return <Div id="items">{griditems}</Div>
  }
}

const Div = styled.div`
   {
    grid-area: quicksells;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(4, 1fr);
    grid-gap: 0.5rem;
    overflow: hidden;
    min-height: 0;
    padding: 0.25rem 0.5rem;
  }
`

export default GridItems
