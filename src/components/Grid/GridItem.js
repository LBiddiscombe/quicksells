import React from 'react'
import ProductImage from '../Shared/ProductImage'
import styled from 'styled-components'

class GridItem extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      flipped: false
    }
  }

  handleClick(e) {
    if (!e.target.id) {
      return
    }

    const product = this.props.data
    const isWithImage = Boolean(product.image)
    const isFilled = !product.empty

    if (isFilled) {
      if (isWithImage) {
        this.setState({
          flipped: !this.state.flipped
        })
      }
    }
  }

  componentWillReceiveProps() {
    this.setState({
      flipped: false
    })
  }

  render() {
    const { changeLayout, droptarget, ...rest } = this.props // disard changeLayout etc from props for DOM use below
    const product = this.props.data
    const isFilled = !product.empty
    const isWithImage = Boolean(product.image)

    return (
      <Div
        {...rest}
        id={'Item' + product.seq}
        ref={'Item' + product.seq}
        isWithImage={isWithImage}
        isFilled={isFilled}
        onClick={this.handleClick}
      >
        {isWithImage && <ProductImage product={product} />}
        {isFilled && <Label>{product.label.replace('�', '£')}</Label>}
      </Div>
    )
  }
}

const Div = styled.div`
   {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: minmax(40%, 60%) minmax(auto, 40%);
    grid-template-areas: 'image' 'label';
    ${props =>
    !props.isWithImage &&
      `
      grid-template-rows: 1fr;
      grid-template-areas: 'label';
    `} justify-content: center;
    align-items: center;
    text-align: center;
    padding-top: 0.25rem;
    overflow: hidden;
    min-width: 0;
    cursor: ${props => (props.isFilled ? 'move' : 'default')};
    background-color: ${props => (props.isFilled ? 'var(--item-bg)' : 'var(--item-empty-bg)')};
    &:hover {
      background-color: ${props => (props.isFilled ? 'var(--item-bg)' : 'var(--item-hover-bg)')};
    }
    &.dragover {
      outline: 4px dashed var(--accent-color);
    }
  }
`

const Label = styled.div`
   {
    grid-area: label;
    padding: 0.25rem;
    font-size: 0.8rem;
    pointer-events: none;
  }
`

export default GridItem
