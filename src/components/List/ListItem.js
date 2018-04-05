import React from 'react'
import ProductImage from '../Shared/ProductImage'
import styled from 'styled-components'

class ListItem extends React.Component {
  render() {
    const product = this.props.data
    const {
      changeLayout,
      inEdit,
      handleProductEdit,
      handleActionClick,
      droptarget,
      ...rest
    } = this.props

    if (inEdit) return null
    return (
      <Li {...rest} onClick={e => this.props.handleActionClick(e, this.props.index)}>
        <ProductImage product={product} />
        <Label>
          {product.label}
          <Sup>{product.item}</Sup>
        </Label>
      </Li>
    )
  }
}

const Li = styled.li`
   {
    display: ${props => (!props.inEdit ? 'grid' : 'none')}
    grid-template-columns: 84px 1fr auto;
    grid-template-areas: 'image label action';
    grid-auto-rows: 64px;
    grid-gap: 0.25rem;
    align-items: center;
    padding: 0.5rem 0.5rem 0.25rem;
    &:hover {
      background-color: rgba(var(--a-color), 1);
    }
  }
`

const Label = styled.div`
   {
    grid-area: label;
  }
`

const Sup = styled.sup`
   {
    display: block;
    font-size: 0.8rem;
    font-family: 'AvenirNextLTW01-Demi';
    color: #aaa;
  }
`

const Actions = styled.div`
   {
    grid-area: action;
    justify-self: center;
    font-size: 1.5rem;
  }
`

export default ListItem
