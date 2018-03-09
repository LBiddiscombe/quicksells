import React from 'react'
import ListItem from './ListItem'
import ListItemEdit from './ListItemEdit'
import settings from '../../settings'

class ListItems extends React.Component {
  constructor() {
    super()
    this.handleActionClick = this.handleActionClick.bind(this)
    this.state = {
      inEditIndex: null
    }
  }

  handleActionClick(e, index, newProduct) {
    console.log('handle action')
    if (this.state.inEditIndex !== null) {
      if (newProduct) {
        this.props.handleProductEdit(this.props.products[index], newProduct)
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
    const products = this.props.products
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
        if (product.group !== lastGroup) {
          rows.push(
            <li className="listcategory" key={'cat' + i}>
              {settings.importGroups.find(g => g.id === product.group).name}
            </li>
          )
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
            <ListItem
              key={i}
              index={i}
              inEdit={inEdit}
              product={product}
              handleProductEdit={this.props.handleProductEdit}
              handleActionClick={this.handleActionClick}
            />
          )
        }
      })

    return (
      <div className="panel-block">
        <ul className="listitems">{rows}</ul>
      </div>
    )
  }
}

export default ListItems
