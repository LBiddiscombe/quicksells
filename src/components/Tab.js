import React from 'react'
import styled from 'styled-components'

const Li = styled.li`
   {
    display: inline;
    font-size: 1.2rem;
    padding: 0.2em 0.5em 0.2em;
    color: rgba(var(--a-color), 0.75);
    border-bottom: 3px solid var(--header-bg);
    &.is-active {
      border-bottom: 2px solid var(--accent-color);
      color: var(--header-color);
      font-family: 'AvenirNextLTW01-Medium';
    }
    &:hover {
      color: rgba(var(--a-color), 0.9);
    }
  }
`

function Tab(props) {
  return (
    <Li
      className={props.tab.id === props.activeId ? 'is-active' : ''}
      value={props.tab.id}
      data-field={props.controlField}
    >
      {props.tab.name}
    </Li>
  )
}

export default Tab
