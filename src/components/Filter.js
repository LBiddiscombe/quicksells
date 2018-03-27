import React from 'react'
import styled from 'styled-components'
import Navbar from './Navbar'
import Tabs from './Tabs'

class Filter extends React.Component {
  constructor() {
    super()
    this.state = {
      activegroup: -1
    }
    this.handleResetFilter = this.handleResetFilter.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleTabChange = this.handleTabChange.bind(this)
  }

  handleResetFilter() {
    this.setState({ activegroup: -1 })
    this.filterInput.value = ''
    this.props.handleFilterChange('', -1)
  }

  handleDrop(ev) {
    ev.preventDefault()
    let source = JSON.parse(ev.dataTransfer.getData('text'))
    ev.target.value = source.label
    this.props.handleFilterChange(ev.target.value, '')
  }

  handleTabChange(e) {
    if (e.target.value) {
      this.setState({ activegroup: e.target.value })
      this.props.handleFilterChange(this.filterInput.value, e.target.value)
    }
  }

  handleInputChange(e) {
    this.props.handleFilterChange(this.filterInput.value, this.state.activegroup)
  }

  render() {
    let groups = [...this.props.groups]
    groups.unshift({ id: -1, name: 'All' })

    return (
      <Wrapper>
        <Navbar handleTabChange={this.handleTabChange}>
          <Tabs dark tabs={groups} controlField="activegroup" activeId={this.state.activegroup} />
        </Navbar>
        <Input
          type="text"
          innerRef={input => (this.filterInput = input)}
          placeholder="search name or code"
          onChange={this.handleInputChange}
          onDrop={e => this.handleDrop(e, this)}
        />
        <A className="dark" onClick={this.handleResetFilter}>
          <i className="fas fa-times-circle" />
        </A>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
   {
    grid-area: filter;
    align-self: center;
    width: 100%;
    position: sticky;
    top: 0.5rem;
    z-index: 2;
    background-color: var(--aside-bg);
    padding: 0 0.5rem 1rem 0;
  }
`

const Input = styled.input`
   {
    width: 100%;
    padding: 0.25rem;
    height: 2.5rem;
  }
`

const A = styled.a`
   {
    position: absolute;
    right: 1rem;
    top: 1rem;
    font-size: 1.5rem;
    display: none;
    ${Wrapper}:hover & {
      display: inline-block;
    }
  }
`

export default Filter
