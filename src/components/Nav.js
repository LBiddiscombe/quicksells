import React from 'react'
import Tabs from './Tabs'

class Nav extends React.Component {
  render() {
    return (
      <nav className="qsnav" onClick={this.props.handleTabChange}>
        <Tabs tabs={this.props.groups} controlField="activegroup" activeId={this.props.activegroup} />
        <Tabs tabs={this.props.pages} controlField="activepage" activeId={this.props.activepage} />
      </nav>
    )
  }
}

export default Nav
