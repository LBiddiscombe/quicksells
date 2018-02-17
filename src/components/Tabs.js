import React from 'react'

function Tab(props) {
  return (
    <li
      className={props.tab.id === props.activeId ? 'is-active' : ''}
      value={props.tab.id}
      data-field={props.controlField}
    >
      {props.tab.name}
    </li>
  )
}

class Tabs extends React.Component {
  render() {
    const tabs = this.props.tabs.map(tab => (
      <Tab
        key={tab.name}
        tab={tab}
        controlField={this.props.controlField}
        activeId={this.props.activeId}
      />
    ))
    return <ul className="qstabs">{tabs}</ul>
  }
}

export default Tabs
