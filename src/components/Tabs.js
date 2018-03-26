import React from 'react'
import Tab from './Tab'
import styled from 'styled-components'

const UL = styled.ul`
  margin: 1rem 0;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`

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
    return <UL>{tabs}</UL>
  }
}

export default Tabs
