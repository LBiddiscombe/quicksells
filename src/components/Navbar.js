import React from 'react'
import styled from 'styled-components'

const Nav = styled.nav`
  grid-column: 1 / -1;
  grid-row: 1;
  justify-self: center;
  text-align: center;
`

class Navbar extends React.Component {
  render() {
    return <Nav onClick={this.props.handleTabChange}>{this.props.children}</Nav>
  }
}

export default Navbar
