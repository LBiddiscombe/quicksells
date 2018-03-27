import React from 'react'
import styled from 'styled-components'

function Tab(props) {
  return (
    <Li {...props} value={props.tab.id} data-field={props.controlField}>
      {props.tab.name}
    </Li>
  )
}

const Li = styled.li`
   {
    display: inline;
    font-size: 1.2rem;
    padding: 0.2em 0.5em 0.2em;
    color: ${props =>
    props.dark ? 'rgba(var(--a-dark-color), 0.75)' : 'rgba(var(--a-color), 0.75)'};
    border-bottom: 3px solid ${props => (props.dark ? 'var(--aside-bg)' : 'var(--header-bg)')};
    &:hover {
      color: ${props =>
    props.dark ? 'rgba(var(--a-dark-color), 0.9)' : 'rgba(var(--a-color), 0.9)'};
    }
    ${props =>
    props.tab.id === props.activeId &&
      `
        border-bottom: 2px solid var(--accent-color);
        color: ${props => (props.dark ? 'var(--aside-color)' : 'var(--header-color)')};
        font-family: 'AvenirNextLTW01-Medium';
      `};
  }
`

export default Tab
