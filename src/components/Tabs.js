import React from 'react'
import Tab from './Tab'
import styled from 'styled-components'

class Tabs extends React.Component {
  render() {
    const tabs = this.props.tabs.map(tab => (
      <Tab
        dark={this.props.dark}
        key={tab.name}
        tab={tab}
        controlField={this.props.controlField}
        activeId={this.props.activeId}
      />
    ))
    return <UL>{tabs}</UL>
  }
}

const UL = styled.ul`
  margin: 1rem 0;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`

export default Tabs
