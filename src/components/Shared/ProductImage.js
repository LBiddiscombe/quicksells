import React from 'react'

/*

TODO: check image exists and if not replace with placeholder

*/

function getImage(url) {
  return new Promise(function(resolve) {
    if (!url) {
      resolve(null)
    }

    var img = new Image()
    img.onload = function() {
      resolve(url)
    }
    img.onerror = function() {
      resolve('https://via.placeholder.com/84x64')
    }
    img.src = url
  })
}

class ProductImage extends React.Component {
  constructor() {
    super()
    this.state = {
      imageSrc: ''
    }
  }

  componentDidMount() {
    const product = this.props.product
    getImage(product.image).then(result => {
      this.setState({
        imageSrc: result
      })
    })
  }

  render() {
    return (
      <div className="itemimg">
        <img src={this.state.imageSrc} alt="" />
      </div>
    )
  }
}

export default ProductImage
