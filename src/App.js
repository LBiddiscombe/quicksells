import React from 'react'
import Header from './components/Header'
import Filter from './components/Filter'
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
      layout: {},
      filter: ''
    }
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleLayoutChange = this.handleLayoutChange.bind(this)
  }

  handleLayoutChange(source, target) {
    const newLayout = this.state.layout

    const layoutPage = newLayout.groups
      .find(g => g.id === source.group)
      .pages.find(p => p.id === source.page).products

    const temp = source.seq
    layoutPage[source.seq - 1].seq = layoutPage[target.seq - 1].seq
    layoutPage[target.seq - 1].seq = temp

    this.setState({
      layout: newLayout
    })
  }

  handleFilterChange(e) {
    this.setState({ filter: e.target.value })
  }

  componentDidMount() {
    ImportFromCSV().then(result => {
      this.setState({
        groups: result.groups,
        pages: result.pages,
        products: result.products,
        layout: result.layout
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Header />
        <Filter handleFilterChange={this.handleFilterChange} />
        <Aside products={this.state.products} filter={this.state.filter} />
        <Main
          groups={this.state.groups}
          pages={this.state.pages}
          layout={this.state.layout}
          changeLayout={this.handleLayoutChange}
        />
      </div>
    )
  }
}

export default App
