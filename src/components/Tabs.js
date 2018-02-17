import React from 'react'

class Tab extends React.Component {
  render() {
    return (
      <li
        className={this.props.tab.id === this.props.activeId ? 'is-active' : ''}
        value={this.props.tab.id}
        data-field={this.props.controlField}
      >
        {this.props.tab.name}
      </li>
    )
  }
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
