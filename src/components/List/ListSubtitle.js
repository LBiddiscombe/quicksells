import React from 'react'
import settings from '../../settings'

function ListSubtitle(props) {
  return (
    <li className="listcategory">{settings.importGroups.find(g => g.id === props.group).name}</li>
  )
}

export default ListSubtitle
