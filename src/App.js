import React from 'react'
import Header from './components/Header'
import Aside from './components/Aside'
import Main from './components/Main'
import ImportFromCSV from './services/ImportFromCSV'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      groups: [],
      pages: [],
      products: [],
      layout: {}
    }
  }

  componentDidMount() {
    ImportFromCSV().then(result => {
      this.setState({
        groups: result.groups,
        pages: result.pages,
        products: result.pages,
        layout: result.layout
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Header />
        <Aside products={this.state.products} />
        <Main
          groups={this.state.groups}
          pages={this.state.pages}
          layout={this.state.layout}
        />
      </div>
    )
  }
}

export default App
