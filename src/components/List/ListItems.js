import React from 'react'
import ListItem from './ListItem'
import ListItemEdit from './ListItemEdit'
import settings from '../../settings'
import DragDrop from '../Shared/DragDrop'
import { AutoSizer, List } from 'react-virtualized'

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
          product.label.toLowerCase().indexOf(this.props.filter.toLowerCase()) !== -1 ||
          product.item.indexOf(this.props.filter) !== -1
        )
      })
      .sort((a, b) => a.group - b.group || a.label.localeCompare(b.label))
      .forEach((product, i) => {
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

    function rowRenderer({
      index, // Index of row within collection
      key, // Unique key within array of rows
      style // Style object to be applied to row (to position it)
    }) {
      return (
        <div key={key} style={style}>
          {rows[index]}
        </div>
      )
    }

    return (
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            rowCount={rows.length}
            rowHeight={64}
            rowRenderer={rowRenderer}
            width={width}
            className="listitems"
          />
        )}
      </AutoSizer>
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

export default ListItems
