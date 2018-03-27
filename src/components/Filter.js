import React from 'react'
import styled from 'styled-components'

class Filter extends React.Component {
  constructor() {
    super()
    this.handleResetFilter = this.handleResetFilter.bind(this)
  }
  componentDidUpdate() {
    const main = document.getElementById('main')
    const filterwrap = document.getElementById('filterwrap')
    filterwrap.style.top = main.clientHeight + 'px'
  }

  handleResetFilter() {
    this.filterInput.value = ''
    this.props.handleFilterChange()
  }

  handleDrop(ev) {
    ev.preventDefault()
    let source = JSON.parse(ev.dataTransfer.getData('text'))
    ev.target.value = source.label
    this.props.handleFilterChange(ev)
  }

  render() {
    return (
      <Wrapper id="filterwrap">
        <Input
          type="text"
          innerRef={input => (this.filterInput = input)}
          placeholder="search name or code"
          onChange={this.props.handleFilterChange}
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
    background-color: var(--aside-bg);
    padding: 0 0.5rem 0 0;
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
    display: none;
    ${Wrapper}:hover & {
      display: inline-block;
      margin: -2rem;
    }
  }
`

export default Filter
