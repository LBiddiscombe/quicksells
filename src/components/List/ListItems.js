import React from 'react'
import ListItem from './ListItem'
import ListItemEdit from './ListItemEdit'
import ListSubtitle from './ListSubtitle'
import DragDrop from '../Shared/DragDrop'
import styled from 'styled-components'

const DragDropListItem = DragDrop(ListItem)

class ListItems extends React.Component {
  constructor() {
    super()
    this.handleActionClick = this.handleActionClick.bind(this)
    this.state = {
      inEditIndex: null
    }
  }

  handleActionClick(e, index, oldProduct, newProduct) {
    if (this.state.inEditIndex !== null) {
      if (newProduct) {
        this.props.handleProductEdit(oldProduct, newProduct)
      }
      this.setState({
        inEditIndex: null
      })
    } else {
      this.setState({
        inEditIndex: index
      })
    }
  }

  render() {
    const products = getUniqueProducts(this.props.products)

    let lastGroup = null
    const rows = []

    const inEdit = Boolean(this.state.inEditIndex !== null)

    products
      .filter(product => {
        return (
          (this.props.filtergroup === -1 || product.group === this.props.filtergroup) &&
          (product.label.toLowerCase().indexOf(this.props.filtertext.toLowerCase()) !== -1 ||
            product.item.indexOf(this.props.filtertext) !== -1)
        )
      })
      .sort((a, b) => a.group - b.group || a.label.localeCompare(b.label))
      .forEach((product, i) => {
        if (!inEdit && product.group !== lastGroup) {
          rows.push(<ListSubtitle key={'cat' + i} group={product.group} />)
          lastGroup = product.group
        }
        if (i === this.state.inEditIndex) {
          rows.push(
            <ListItemEdit
              key={i}
              index={i}
              product={product}
              handleProductEdit={this.props.handleProductEdit}
              handleActionClick={this.handleActionClick}
            />
          )
        } else {
          rows.push(
            <DragDropListItem
              key={i}
              index={i}
              inEdit={inEdit}
              data={product}
              handleProductEdit={this.props.handleProductEdit}
              handleActionClick={this.handleActionClick}
              draggable={true}
              droptarget={false}
            />
          )
        }
      })

    return (
      <Wrapper>
        <Ul inEdit={inEdit}>{rows}</Ul>
      </Wrapper>
    )
  }
}

function getUniqueProducts(products) {
  const tempProducts = JSON.parse(JSON.stringify(products))
  const unique = tempProducts
    .filter(p => !p.empty)
    .reduce(
      (uniqueProducts, product) =>
        uniqueProducts.findIndex(p => p.item === product.item && p.label === product.label) < 0
          ? [...uniqueProducts, product]
          : uniqueProducts,
      []
    )

  return unique.map(p => {
    const isPopular =
      products.findIndex(
        pr => pr.item === p.item && pr.label === p.label && pr.group === p.group && pr.page === 1
      ) >= 0
    delete p.page
    p.isPopular = isPopular
    return p
  })
}

const Wrapper = styled.div`
  grid-area: list;
  overflow-y: scroll;
`

const Ul = styled.ul`
   {
    width: 100%;
    ${props => (props.inEdit ? 'height: 100%;' : '')};
  }
`

export default ListItems
