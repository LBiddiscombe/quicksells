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

    this.handleLayoutChange = this.handleLayoutChange.bind(this)
  }

  handleLayoutChange(source, target) {
    const newLayout = this.state.layout

    const layoutPage = newLayout.groups.find(g => g.id === source.group).pages.find(p => p.id === source.page).products

    const temp = source.seq
    layoutPage[source.seq - 1].seq = layoutPage[target.seq - 1].seq
    layoutPage[target.seq - 1].seq = temp

    this.setState({
      layout: newLayout
    })
  }

  componentDidMount() {
    ImportFromCSV().then(result => {
      this.setState({
        groups: result.groups,
        pages: result.pages,
        products: result.products,
        layout: result.layout,
        changeLayout: this.handleLayoutChange
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
          changeLayout={this.state.changeLayout}
        />
      </div>
    )
  }
}

export default App
