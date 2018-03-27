import React from 'react'
import styled from 'styled-components'
import settings from '../../settings'

const Li = styled.li`
   {
    font-size: 1.2rem;
    font-family: 'AvenirNextLTW01-Medium';
    border-bottom: 2px solid var(--accent-color);
    background-color: var(--aside-bg);
    position: sticky;
    top: 0px;
    z-index: 2;
    &:not(:first-child) {
      margin-top: 1rem;
    }
  }
`
function ListSubtitle(props) {
  return <Li>{settings.importGroups.find(g => g.id === props.group).name}</Li>
}

export default ListSubtitle
