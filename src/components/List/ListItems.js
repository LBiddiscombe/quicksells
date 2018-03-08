import React from 'react'
import ListItem from './ListItem'
import settings from '../../settings'

class ListItems extends React.Component {
  render() {
    const products = this.props.products
    let lastGroup = null
    const rows = []

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
        rows.push(<ListItem key={i} product={product} />)
      })

    return (
      <div className="panel-block">
        <ul className="listitems">{rows}</ul>
      </div>
    )
  }
}

export default ListItems
